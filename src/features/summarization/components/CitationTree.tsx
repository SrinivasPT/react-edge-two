import { Paper, Typography } from '@mui/material';
import { TreeControl } from 'lib/components/TreeControl';
import { PageContext } from 'lib/context';
import { useContext } from 'react';
import { useSummarization } from '../use-summarization';

const CitationTree = () => {
    const { state, dispatch } = useContext(PageContext);
    const { handleAddNode, handleDeleteNode, handleMoveNode, handleNodeSelect } = useSummarization();

    return (
        <Paper
            className="paper"
            style={{
                width: '95%',
                height: '95%',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
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
