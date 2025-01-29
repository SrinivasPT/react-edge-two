import { Cancel, Delete, EditNote, Save } from '@mui/icons-material';
import { Box, Button, IconButton, TableBody as MuiTableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ControlBuilder } from '../../builder';
import { ControlConfig } from '../../types';
import { TableConfig } from './TableConfig';

interface TableBodyProps {
    columns: { Header: string; accessor: string; control: ControlConfig }[];
    paginatedData: any[];
    editRowIndex: number | null;
    parentPath: string;
    onEdit: (rowIndex: number) => void;
    onSave: () => void;
    onCancel: () => void;
    onDeleteRow: (rowIndex: number) => void;
    isEditableGrid: boolean;
    hyperlinkColumn?: string;
    currentPage: number; // Add currentPage prop
    rowsPerPage: number; // Add rowsPerPage prop
    tableConfig: TableConfig;
}

export const TableBody: React.FC<TableBodyProps> = ({
    columns,
    paginatedData,
    editRowIndex,
    parentPath,
    onEdit,
    onSave,
    onCancel,
    onDeleteRow,
    isEditableGrid,
    hyperlinkColumn,
    currentPage, // Use currentPage prop
    rowsPerPage, // Use rowsPerPage prop
    tableConfig,
}) => {
    const navigate = useNavigate();

    if (paginatedData.length === 0) {
        return (
            <MuiTableBody>
                <TableRow>
                    <TableCell colSpan={columns.length + (tableConfig.showRowActions ? 1 : 0)} align="center">
                        No Records Found
                    </TableCell>
                </TableRow>
            </MuiTableBody>
        );
    }

    return (
        <MuiTableBody>
            {paginatedData.map((row: any, rowIndex: number) => {
                const absoluteRowIndex = currentPage * rowsPerPage + rowIndex; // Adjust row index

                return (
                    <TableRow key={absoluteRowIndex}>
                        {tableConfig.showRowActions && (
                            <TableCell padding="none">
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    {editRowIndex === absoluteRowIndex ? (
                                        <>
                                            <IconButton size="small" color="primary" onClick={onSave}>
                                                <Save fontSize="medium" />
                                            </IconButton>
                                            <IconButton size="small" color="secondary" onClick={onCancel}>
                                                <Cancel fontSize="medium" />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton size="small" color="primary" onClick={() => onEdit(absoluteRowIndex)}>
                                                <EditNote fontSize="medium" />
                                            </IconButton>
                                            {tableConfig.showRowDelete && (
                                                <IconButton size="small" color="secondary" onClick={() => onDeleteRow(absoluteRowIndex)}>
                                                    <Delete fontSize="medium" />
                                                </IconButton>
                                            )}
                                        </>
                                    )}
                                </Box>
                            </TableCell>
                        )}
                        {columns.map((column: any) => (
                            <TableCell key={`${absoluteRowIndex}-${column.accessor}`} style={{ padding: '8px' }}>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    {editRowIndex === absoluteRowIndex || tableConfig.allRowsEditable ? (
                                        <Box width="100%">
                                            <ControlBuilder
                                                config={{
                                                    ...column.control,
                                                    dataPath: `${parentPath}.${absoluteRowIndex}.${column.accessor}`,
                                                }}
                                                parentPath={`${parentPath}.${absoluteRowIndex}`}
                                                additionalProps={{ hideLabel: true }}
                                            />
                                        </Box>
                                    ) : hyperlinkColumn && hyperlinkColumn === column.accessor ? (
                                        <Button
                                            onClick={() => navigate(`${row[column.accessor]}`)}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            {row[column.accessor]}
                                        </Button>
                                    ) : row[column.accessor] !== undefined ? (
                                        row[column.accessor]
                                    ) : (
                                        ''
                                    )}
                                </Box>
                            </TableCell>
                        ))}
                    </TableRow>
                );
            })}
        </MuiTableBody>
    );
};
