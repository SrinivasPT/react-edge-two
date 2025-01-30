import React, { useState } from 'react';
import { RichTreeView, TreeItem } from '@mui/x-tree-view';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon, ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
}

export interface TreeControlProps {
    value: TreeNode[];
    dataPath: string;
    label: string;
    hideLabel?: boolean;
    isRequired?: boolean;
    onAddNode: (node: TreeNode) => void;
    onDeleteNode: (nodeId: string) => void;
    onMoveNode: (nodeId: string, newParentId: string) => void;
    onNodeSelect?: (nodeId: string | null) => void;
    allowAdd?: boolean;
    allowDelete?: boolean;
    allowMove?: boolean;
}

export const TreeControl: React.FC<TreeControlProps> = ({
    value,
    dataPath,
    label,
    hideLabel,
    isRequired,
    onAddNode,
    onDeleteNode,
    onMoveNode,
    onNodeSelect,
    allowAdd = true,
    allowDelete = true,
    allowMove = true,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    const handleNodeSelect = (event: React.SyntheticEvent, nodeId: string | null) => {
        setSelectedNode(nodeId);
        onNodeSelect?.(nodeId);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAddNode = () => {
        const newNode: TreeNode = { id: `node-${Date.now()}`, label: 'New Node', children: [] };
        onAddNode(newNode);
        handleMenuClose();
    };

    const handleDeleteNode = () => {
        if (selectedNode) {
            onDeleteNode(selectedNode);
            setSelectedNode(null);
            handleMenuClose();
        }
    };

    const handleMoveNode = (newParentId: string) => {
        if (selectedNode) {
            onMoveNode(selectedNode, newParentId);
            setSelectedNode(null);
            handleMenuClose();
        }
    };

    const renderTree = (nodes: TreeNode) => (
        <TreeItem key={nodes.id} itemId={nodes.id} label={nodes.label}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={label} hideLabel={hideLabel} isRequired={isRequired} />
            <RichTreeView
                slots={{ expandIcon: ChevronRightIcon, collapseIcon: ExpandMoreIcon }}
                onSelectedItemsChange={handleNodeSelect}
                items={value}
            >
                {value.map((node) => renderTree(node))}
            </RichTreeView>
            <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {allowAdd && <MenuItem onClick={handleAddNode}>Add Node</MenuItem>}
                {allowDelete && (
                    <MenuItem onClick={handleDeleteNode} disabled={!selectedNode}>
                        Delete Node
                    </MenuItem>
                )}
                {allowMove && (
                    <MenuItem onClick={() => handleMoveNode('parent-id')} disabled={!selectedNode}>
                        Move Node
                    </MenuItem>
                )}
            </Menu>
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
