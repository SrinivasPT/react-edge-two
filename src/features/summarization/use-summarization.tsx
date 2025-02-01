import { PageContext } from 'lib/context';
import { fetcher } from 'lib/thirdparty';
import { TreeNode } from 'lib/types';
import { useContext } from 'react';
import { CitationGroup, Citation } from 'types/citation';

export const useSummarization = () => {
    const { state, dispatch } = useContext(PageContext);

    const handleNodeSelect = (nodeId: string) => {
        console.log('Selected node:', nodeId);
        const itemId = nodeId.split('-')[1].trim();
        const formConfig = nodeId.split('-')[0].trim() === 'TOP' ? state.internal.groupConfig : state.internal.clusterConfig;
        const formData =
            nodeId.split('-')[0].trim() === 'TOP'
                ? state.data.groups.find((c: CitationGroup) => c.citation_group_id.toString() === itemId)
                : state.data.citations.find((c: Citation) => c.citation_id.toString() === itemId);
        dispatch({ type: 'CONTROL_VALUE_CHANGE', payload: { dataPath: 'formDetail', value: formData } });
        dispatch({ type: 'SET_CONFIG', payload: formConfig });
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
        const [formClusterConfigResponse, formGroupConfigResponse, clusterResponse] = await Promise.all([
            fetcher.get('http://localhost:3001/form-config/FORM->CLUSTER-DETAIL'),
            fetcher.get('http://localhost:3001/form-config/FORM->GROUP-CLUSTER-DETAIL'),
            fetcher.get(`http://localhost:3001/cluster/${params.id}`),
        ]);

        // Extract data from responses
        const clusterConfig = formClusterConfigResponse.data;
        const groupConfig = formGroupConfigResponse.data;
        const data = clusterResponse.data;

        // Transform data into tree nodes
        const treeData = getTreeNodes(data['groups'], data['citations']);

        // Return the combined data
        return {
            data,
            internal: { treeData, clusterConfig, groupConfig },
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
