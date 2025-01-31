import { Paper, Typography } from '@mui/material';
import { TreeControl } from 'lib/components/TreeControl';
import { useSummarization } from '../../../summarization/use-summarization';
import { PageContext } from 'lib/context';
import { useContext } from 'react';

const CitationTree = () => {
    const { state, dispatch } = useContext(PageContext);
    const { handleAddNode, handleDeleteNode, handleMoveNode, handleNodeSelect } = useSummarization();

    return (
        <Paper className="paper">
            <Typography variant="h6">Citation Tree</Typography>
            <TreeControl
                data={state.internal?.treeData || []}
                label="Citations"
                onAddNode={handleAddNode}
                onDeleteNode={handleDeleteNode}
                onMoveNode={handleMoveNode}
                onNodeSelect={handleNodeSelect}
            />
        </Paper>
    );
};

export default CitationTree;
