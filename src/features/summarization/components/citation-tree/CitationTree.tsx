import { Paper, Typography } from '@mui/material';
import { TreeControl } from 'lib/components/TreeControl';
import { useSummarization } from '../../../summarization/use-summarization';

const CitationTree = () => {
    const { treeData, handleAddNode, handleDeleteNode, handleMoveNode } = useSummarization();

    return (
        <Paper className="paper">
            <Typography variant="h6">Citation Tree</Typography>
            <TreeControl
                data={treeData}
                label="Citations"
                onAddNode={handleAddNode}
                onDeleteNode={handleDeleteNode}
                onMoveNode={handleMoveNode}
            />
        </Paper>
    );
};

export default CitationTree;
