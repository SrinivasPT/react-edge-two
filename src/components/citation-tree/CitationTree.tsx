import { Paper, Typography } from '@mui/material';
import { TreeControl } from '../../lib/components/TreeControl';
import { useState } from 'react';
import { TreeNode } from 'lib/types';

const initialTreeData: TreeNode[] = [
    {
        id: '1',
        label: 'Chapter 1',
        children: [
            { id: '1.1', label: 'Section 1.1', children: [] },
            { id: '1.2', label: 'Section 1.2', children: [] },
        ],
    },
    {
        id: '2',
        label: 'Chapter 2',
        children: [],
    },
];

const CitationTree = () => {
    const [treeData, setTreeData] = useState(initialTreeData);

    const handleAddNode = (newNode: TreeNode) => {
        setTreeData([...treeData, newNode]);
    };

    const handleDeleteNode = (nodeId: string) => {
        // Simple deletion - in real app you'd need recursive search
        setTreeData(treeData.filter((node) => node.id !== nodeId));
    };

    const handleMoveNode = (nodeId: string, newParentId: string) => {
        // Implement move logic here
        console.log('Moving node', nodeId, 'to', newParentId);
    };

    return (
        <Paper className="paper">
            <Typography variant="h6">Citation Tree</Typography>
            <TreeControl
                value={treeData}
                dataPath="citations"
                label="Citations"
                onAddNode={handleAddNode}
                onDeleteNode={handleDeleteNode}
                onMoveNode={handleMoveNode}
                onNodeSelect={(nodeId) => console.log('Selected:', nodeId)}
            />
        </Paper>
    );
};

export default CitationTree;
