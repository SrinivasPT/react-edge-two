import { PageContext } from 'lib/context';
import { useContext } from 'react';
import { CitationGroup } from 'types/citation';

export const useSummarization = () => {
    const { state, dispatch } = useContext(PageContext);

    const getTreeNodes = () => {
        const data: CitationGroup[] = state.data.groups;
        const nodes = data.map((group: CitationGroup) => ({
            id: group.citation_group_id,
            label: group.citation_group_name,
            children: group.citations.map((citation: number) => ({ id: citation, label: citation })),
        }));
        return nodes;
    };

    return { getTreeNodes };
};
