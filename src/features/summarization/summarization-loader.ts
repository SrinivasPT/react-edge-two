import { fetcher } from 'lib/thirdparty';
import { TreeNode } from 'lib/types';
import { Citation, CitationGroup } from 'types/citation';

export const SummarizationLoader = async (params: any) => {
    // Fetch data in parallel
    const [formConfigResponse, clusterResponse] = await Promise.all([
        fetcher.get('http://localhost:3001/form-config/FORM->CLUSTER-DETAIL'),
        fetcher.get(`http://localhost:3001/cluster/${params.id}`),
    ]);

    // Extract data from responses
    const formConfig = formConfigResponse.data;
    const data = clusterResponse.data;

    // Transform data into tree nodes
    const treeData = getTreeNodes(data['groups'], data['citations']);

    // Return the combined data
    return {
        formConfig,
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
