import { styled, TableCell, TableHead, TableRow, TableSortLabel, TextField } from '@mui/material';
import React from 'react';
import { TableConfig } from './TableConfig';

interface TableHeaderProps {
    columns: any[];
    sortConfig: { key: string; direction: string };
    handleSort: (key: string) => void;
    filterInput: { [key: string]: string };
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditableGrid: boolean;
    tableConfig: TableConfig;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
}));

const StyledFilterCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.shape.borderRadius,
        paddingLeft: theme.spacing(1),
    },
}));

export const TableHeader: React.FC<TableHeaderProps> = ({
    columns,
    sortConfig,
    handleSort,
    filterInput,
    isEditableGrid,
    handleFilterChange,
    tableConfig,
}) => {
    return (
        <TableHead>
            <TableRow>
                {tableConfig.showRowActions && <StyledTableCell>Actions</StyledTableCell>}
                {columns.map((column: any) => (
                    <StyledTableCell key={column.accessor}>
                        <TableSortLabel
                            active={sortConfig.key === column.accessor}
                            direction={sortConfig.direction === 'asc' ? 'asc' : 'desc'}
                            onClick={() => handleSort(column.accessor)}
                            sx={{ color: 'inherit' }} // Ensure sort label inherits the text color
                        >
                            {column.Header}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
            {tableConfig.showFilters && (
                <TableRow>
                    {isEditableGrid && <StyledFilterCell />}
                    {columns.map((column: any) => (
                        <StyledFilterCell key={`filter-${column.accessor}`}>
                            <StyledTextField
                                variant="standard"
                                size="small"
                                name={column.accessor}
                                value={filterInput[column.accessor] || ''}
                                onChange={handleFilterChange}
                                placeholder={`Filter ${column.Header}`}
                                fullWidth
                            />
                        </StyledFilterCell>
                    ))}
                </TableRow>
            )}
        </TableHead>
    );
};
