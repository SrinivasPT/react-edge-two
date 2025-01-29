import { ChevronLeft, ChevronRight, MoreHoriz } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface PaginationProps {
    currentPage: number;
    pageCount: number;
    handlePageChange: (newPage: number) => void | any;
    rowsPerPage: number;
    handleRowsPerPageChange: (event: SelectChangeEvent<number>, child: ReactNode) => void;
}

export const PaginationControl: React.FC<PaginationProps> = ({
    currentPage,
    pageCount,
    handlePageChange,
    rowsPerPage,
    handleRowsPerPageChange,
}) => {
    const pages = [];
    const maxPagesToShow = 10;
    const currentBlock = Math.floor(currentPage / maxPagesToShow);

    const startPage = currentBlock * maxPagesToShow;
    const endPage = Math.min(startPage + maxPagesToShow, pageCount);

    for (let i = startPage; i < endPage; i++) {
        pages.push(
            <Button
                key={i}
                onClick={() => handlePageChange(i)}
                variant={i === currentPage ? 'contained' : 'text'}
                sx={{ minWidth: 36, margin: '0 4px' }}
            >
                {i + 1}
            </Button>
        );
    }

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} px={2}>
            <Box display="flex" alignItems="center">
                <IconButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} color="primary">
                    <ChevronLeft />
                </IconButton>
                {startPage > 0 && (
                    <IconButton onClick={() => handlePageChange(startPage - 1)} color="primary">
                        <MoreHoriz />
                    </IconButton>
                )}
                {pages}
                {endPage < pageCount && (
                    <IconButton onClick={() => handlePageChange(endPage)} color="primary">
                        <MoreHoriz />
                    </IconButton>
                )}
                <IconButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount - 1} color="primary">
                    <ChevronRight />
                </IconButton>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">Rows per page:</Typography>
                <FormControl variant="outlined" size="small">
                    <Select value={rowsPerPage} onChange={handleRowsPerPageChange} displayEmpty>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <MenuItem key={pageSize} value={pageSize}>
                                {pageSize}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};
