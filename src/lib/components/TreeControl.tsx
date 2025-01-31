import React, { useState, useEffect } from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { Menu, MenuItem } from '@mui/material';

export interface TreeNode {
    id: string;
    label: string;
    parentId?: string;
    children?: TreeNode[];
}

export interface TreeControlProps {
    data: TreeNode[];
    label: string;
    onAddNode: (node: TreeNode) => void;
    onDeleteNode: (nodeId: string) => void;
    onMoveNode: (nodeId: string, newParentId: string) => void;
    onNodeSelect: (nodeId: string) => void;
}

export const TreeControl: React.FC<TreeControlProps> = ({ data, label, onAddNode, onDeleteNode, onMoveNode, onNodeSelect }) => {
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
        nodeId: string;
    } | null>(null);
    const [selectedNode, setSelectedNodeId] = useState<string | null>(null);
    const [potentialParents, setPotentialParents] = useState<TreeNode[]>([]);
    const [showMoveOptions, setShowMoveOptions] = useState(false);

    const handleContextMenu = (event: React.MouseEvent, nodeId: string) => {
        event.preventDefault();
        event.stopPropagation(); // Stop event from bubbling up
        setSelectedNodeId(nodeId);
        setContextMenu({
            mouseX: event.clientX,
            mouseY: event.clientY,
            nodeId,
        });
    };

    const handleMenuClose = () => {
        setContextMenu(null);
        setShowMoveOptions(false);
        setSelectedNodeId(null);
    };

    const handleAddNode = () => {
        const newNode: TreeNode = { id: `node-${Date.now()}`, label: 'New Node', children: [] };
        onAddNode(newNode);
        handleMenuClose();
    };

    const handleDeleteNode = () => {
        if (selectedNode) {
            onDeleteNode(selectedNode);
            setSelectedNodeId(null);
            handleMenuClose();
        }
    };

    const handleMoveNode = (newParentId: string) => {
        if (selectedNode) {
            onMoveNode(selectedNode, newParentId);
            setSelectedNodeId(null);
            handleMenuClose();
        }
    };

    const handleNodeSelect = (event: React.MouseEvent, nodeId: string) => {
        onNodeSelect(nodeId);
    };

    const buildParentList = (nodes: TreeNode[], excludeId: string): TreeNode[] => {
        return nodes
            .filter((node) => node.id !== excludeId)
            .map((node) => ({
                ...node,
                children: node.children ? buildParentList(node.children, excludeId) : [],
            }));
    };

    useEffect(() => {
        if (selectedNode) {
            const parents = buildParentList(data, selectedNode);
            setPotentialParents(parents);
        }
    }, [selectedNode]);

    const renderTree = (node: TreeNode) => (
        <TreeItem
            key={node.id}
            itemId={`${node?.parentId || 'TOP'}-${node.id}`}
            label={
                <div
                    role="button"
                    tabIndex={0}
                    onContextMenu={(e) => handleContextMenu(e, node.id)}
                    onKeyDown={(e) => {
                        if (e.key === 'ContextMenu' || (e.key === 'F10' && e.shiftKey)) {
                            e.preventDefault();
                            handleContextMenu(e as any, node.id);
                        }
                    }}
                    style={{
                        padding: '4px',
                        borderRadius: '4px',
                        userSelect: 'none',
                        width: '100%',
                        cursor: 'context-menu',
                    }}
                >
                    {node.label}
                </div>
            }
            sx={{
                '& .MuiTreeItem-content:hover': { backgroundColor: 'action.hover' },
                '& .MuiTreeItem-root': { position: 'relative' },
            }}
        >
            {Array.isArray(node.children) ? node.children.map(renderTree) : null}
        </TreeItem>
    );

    return (
        <>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{label}</div>
            <SimpleTreeView onItemClick={handleNodeSelect}>{data.map(renderTree)}</SimpleTreeView>
            <Menu
                open={contextMenu !== null}
                disablePortal={false}
                anchorReference="anchorPosition"
                anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
                onClose={handleMenuClose}
                slotProps={{
                    paper: {
                        elevation: 3,
                        sx: { minWidth: 150 },
                    },
                    root: {
                        'aria-label': 'Tree item actions',
                    },
                }}
                MenuListProps={{
                    'aria-label': 'Tree item actions',
                    role: 'menu',
                }}
            >
                {showMoveOptions
                    ? [
                          <MenuItem key="back" onClick={() => setShowMoveOptions(false)}>
                              ← Back
                          </MenuItem>,
                          ...potentialParents.map((parent) => (
                              <MenuItem key={parent.id} onClick={() => handleMoveNode(parent.id)}>
                                  Move to: {parent.label}
                              </MenuItem>
                          )),
                      ]
                    : [
                          <MenuItem key="add" onClick={handleAddNode}>
                              Add Node
                          </MenuItem>,
                          <MenuItem key="delete" onClick={handleDeleteNode} disabled={!selectedNode}>
                              Delete Node
                          </MenuItem>,
                          <MenuItem key="move" onClick={() => setShowMoveOptions(true)} disabled={!selectedNode}>
                              Move Node
                          </MenuItem>,
                      ]}
            </Menu>
        </>
    );
};
