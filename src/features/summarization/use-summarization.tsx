import { PageContext } from 'lib/context';
import { fetchFormData } from 'lib/hooks/util/fetchFormData';
import { TreeNode } from 'lib/types';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Citation, CitationGroup } from 'types/citation';

export const useSummarization = () => {
    const { id } = useParams<{ id: string }>();
    const { state, dispatch } = useContext(PageContext);
    const config = { url: 'cluster', formDetailConfig: 'form-config/FORM->CLUSTER-DETAIL', entity: 'cluster' };
    const treeData = state.internal.treeData;

    const initializeForm = async () => {
        try {
            const newData = await fetchFormData(config, id);
            dispatch({
                type: 'INITIALIZE_DATA',
                payload: {
                    config: newData.config,
                    data: id === 'new' ? {} : newData.data,
                    internal: { formType: 'GENERIC_DETAIL', actionConfig: config, id, treeData: getTreeNodes() },
                },
            });
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    const getTreeNodes = (): TreeNode[] => {
        const data: CitationGroup[] = state.data.groups;
        const nodes = data.map((group: CitationGroup) => ({
            id: group.citation_group_id.toString(),
            label: group.citation_group_name,
            children:
                group.citations?.map((citation: Citation) => ({
                    id: citation.citation_id.toString(),
                    label: citation.citation_number,
                    children: [] as TreeNode[],
                })) || [],
        }));
        return nodes as TreeNode[];
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

    return {
        treeData,
        handleAddNode,
        handleDeleteNode,
        handleMoveNode,
        initializeForm,
    };
};
