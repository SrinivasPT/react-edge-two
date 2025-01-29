import { AddCircle } from '@mui/icons-material';
import { Box, IconButton, Paper, Table, TableContainer } from '@mui/material';
import { PageContext } from 'lib/context';
import React, { useContext, useMemo } from 'react';
import { getNestedValue } from '../common/functions';
import { useControlState, useTable } from '../hooks';
import { ControlConfig, ControlProps } from '../types';
import { PaginationControl } from './table/PaginationControl';
import { TableBody } from './table/TableBody';
import { TABLE_CONFIG, TableConfig } from './table/TableConfig';
import { TableHeader } from './table/TableHeader';

export const TableControl: React.FC<ControlProps> = ({ config, parentPath }) => {
    const { state, dataPath } = useControlState(config, parentPath);
    const { dispatch } = useContext(PageContext);
    const data = getNestedValue(state.data, dataPath) || [];

    const columns = useMemo(
        () => config?.controls?.map((col: ControlConfig) => ({ Header: col.label, accessor: col.key, control: col })) || [],
        [config.controls]
    );

    const tableConfig: TableConfig = TABLE_CONFIG[config.typeCode];

    const {
        filterInput,
        sortConfig,
        currentPage,
        rowsPerPage,
        paginatedData,
        sortedData,
        editRowIndex,
        handleFilterChange,
        handleSort,
        handlePageChange,
        handleRowsPerPageChange,
        handleEdit,
        handleSave,
        handleCancel,
    } = useTable({ data, columns: config?.controls || [] });

    const handleAddNew = () => {
        const newRow = {};
        const updatedData = Array.isArray(data) ? [newRow, ...data] : [newRow];
        dispatch({ type: 'CONTROL_VALUE_CHANGE', payload: { dataPath, value: updatedData } });
    };

    const handleDeleteRow = (rowIndex: number) => {
        const updatedData = data.filter((_: any, index: number) => index !== rowIndex);
        dispatch({ type: 'CONTROL_VALUE_CHANGE', payload: { dataPath, value: updatedData } });
    };

    return (
        <TableContainer component={Paper}>
            <Box display="flex" justifyContent="space-between" alignItems="end" padding={0}>
                <IconButton size="small" onClick={handleAddNew}>
                    <AddCircle fontSize="large" />
                </IconButton>
            </Box>
            <Table size="small">
                <TableHeader
                    columns={columns}
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    filterInput={filterInput}
                    isEditableGrid={config.isEditableGrid === 'Y'}
                    handleFilterChange={handleFilterChange}
                    tableConfig={tableConfig}
                />
                <TableBody
                    columns={columns}
                    paginatedData={paginatedData}
                    editRowIndex={editRowIndex}
                    parentPath={dataPath}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onDeleteRow={handleDeleteRow}
                    isEditableGrid={config.isEditableGrid === 'Y'}
                    hyperlinkColumn={config.hyperlinkColumn}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    tableConfig={tableConfig}
                />
            </Table>
            {tableConfig.showPagination && (
                <PaginationControl
                    currentPage={currentPage}
                    pageCount={Math.ceil(sortedData.length / rowsPerPage)}
                    handlePageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                />
            )}
        </TableContainer>
    );
};
