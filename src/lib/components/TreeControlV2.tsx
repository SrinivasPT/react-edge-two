import React, { useState } from 'react';
import { RichTreeView, TreeItem } from '@mui/x-tree-view';
import { IconButton, Menu, MenuItem } from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    ExpandMore as ExpandMoreIcon,
    ChevronRight as ChevronRightIcon,
    DragIndicator as DragHandleIcon,
} from '@mui/icons-material';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
}

export interface TreeControlV2Props {
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

export const TreeControlV2: React.FC<TreeControlV2Props> = ({
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
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
    const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleNodeSelect = (event: React.SyntheticEvent, nodeId: string | null) => {
        if (!isDragging) {
            setSelectedNode(nodeId);
            onNodeSelect?.(nodeId);
        }
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

    const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findNodeById(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const handleDragStart = (event: React.DragEvent<HTMLLIElement>, nodeId: string) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.drag-handle')) {
            event.preventDefault();
            return;
        }

        event.stopPropagation();
        setDraggedNode(nodeId);
        setIsDragging(true);
        event.dataTransfer.setData('text', nodeId);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (event: React.DragEvent<HTMLLIElement>, nodeId: string) => {
        event.preventDefault();
        event.stopPropagation();
        setDragOverNodeId(nodeId);
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDragLeave = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragOverNodeId(null);
    };

    const handleDrop = (event: React.DragEvent<HTMLLIElement>, targetId: string) => {
        event.preventDefault();
        event.stopPropagation();

        const sourceId = event.dataTransfer.getData('text');

        if (sourceId && sourceId !== targetId) {
            const sourceNode = findNodeById(value, sourceId);
            const targetNode = findNodeById(value, targetId);

            const isDescendant = (parent: TreeNode | null, childId: string): boolean => {
                if (!parent) return false;
                if (parent.id === childId) return true;
                return parent.children?.some((child) => isDescendant(child, childId)) || false;
            };

            if (sourceNode && !isDescendant(sourceNode, targetId)) {
                onMoveNode(sourceId, targetId);
            }
        }

        setDraggedNode(null);
        setDragOverNodeId(null);
        setIsDragging(false);
    };

    const renderTreeItemLabel = (label: string, nodeId: string) => (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                cursor: allowMove ? 'default' : 'pointer',
            }}
        >
            {allowMove && (
                <DragHandleIcon
                    className="drag-handle"
                    sx={{
                        fontSize: '20px',
                        cursor: 'grab',
                        color: draggedNode === nodeId ? 'primary.main' : 'action.disabled',
                        '&:hover': { color: 'action.active' },
                        '&:active': { cursor: 'grabbing' },
                    }}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        const targetElement = e.currentTarget;
                        targetElement.style.cursor = 'grabbing';
                    }}
                    onMouseUp={(e) => {
                        const targetElement = e.currentTarget;
                        targetElement.style.cursor = 'grab';
                    }}
                />
            )}
            <span>{label}</span>
        </div>
    );

    const renderTree = (nodes: TreeNode) => (
        <TreeItem
            key={nodes.id}
            itemId={nodes.id}
            label={renderTreeItemLabel(nodes.label, nodes.id)}
            draggable={allowMove}
            onDragStart={(e) => handleDragStart(e, nodes.id)}
            onDragOver={(e) => handleDragOver(e, nodes.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, nodes.id)}
            sx={{
                '& *': {
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                },
                '&[data-dragging="true"]': {
                    opacity: 0.4,
                    border: '1px dashed',
                    borderColor: 'primary.main',
                    backgroundColor: 'action.hover',
                    transition: 'all 0.2s ease',
                },
                '&[data-dragover="true"]': {
                    backgroundColor: (theme) => theme.palette.action.hover,
                    outline: (theme) => `2px dashed ${theme.palette.primary.main}`,
                    outlineOffset: '-2px',
                },
                '& .MuiTreeItem-content': {
                    padding: '4px',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                },
                transition: 'all 0.2s ease',
                cursor: 'default',
                userSelect: 'none',
            }}
            data-dragging={draggedNode === nodes.id}
            data-dragover={dragOverNodeId === nodes.id}
        >
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
