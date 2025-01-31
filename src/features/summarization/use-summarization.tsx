import { PageContext } from 'lib/context';
import { fetcher } from 'lib/thirdparty';
import { TreeNode } from 'lib/types';
import { useContext } from 'react';
import { CitationGroup, Citation } from 'types/citation';

export const useSummarization = () => {
    const { state, dispatch } = useContext(PageContext);

    const handleNodeSelect = (nodeId: string) => {
        console.log('Selected node:', nodeId);
    };

    const handleAddNode = (newNode: TreeNode) => {
        // setTreeData([...treeData, newNode]);
    };

    const handleDeleteNode = (nodeId: string) => {
        // setTreeData(treeData.filter((node) => node.id !== nodeId));
    };

    const handleMoveNode = (nodeId: string, newParentId: string) => {
        console.log('Moving node', nodeId, 'to', newParentId);
        // Implement move logic here
    };

    const dataLoader = async (params: any) => {
        // Fetch data in parallel
        const [formConfigResponse, clusterResponse] = await Promise.all([
            fetcher.get('http://localhost:3001/form-config/FORM->CLUSTER-DETAIL'),
            fetcher.get(`http://localhost:3001/cluster/${params.id}`),
        ]);

        // Extract data from responses
        const config = formConfigResponse.data;
        const data = clusterResponse.data;

        // Transform data into tree nodes
        const treeData = getTreeNodes(data['groups'], data['citations']);

        // Return the combined data
        return {
            config,
            data,
            internal: { treeData },
        };
    };

    const getTreeNodes = (groups: CitationGroup[], citations: Citation[]): TreeNode[] => {
        const nodes = groups.map((group: CitationGroup) => ({
            id: group.citation_group_id.toString(),
            label: group.citation_group_name,
            children: group.citations.map((citation_id) => {
                const citation = citations.find((c) => c.citation_id === citation_id);
                return {
                    id: citation_id.toString(),
                    label: citation?.citation_number || '',
                    parentId: group.citation_group_id.toString(),
                    children: [] as TreeNode[],
                };
            }),
        }));
        return nodes;
    };

    return {
        dataLoader,
        handleAddNode,
        handleDeleteNode,
        handleMoveNode,
        handleNodeSelect,
    };
};
