import { useCallback, useMemo, useState } from 'react';
import { ObjectWithKeys } from '../types';

interface UseTableProps {
    data: any[];
    columns: any[];
}

export const useTable = ({ data, columns }: UseTableProps) => {
    const [filterInput, setFilterInput] = useState({} as ObjectWithKeys);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editRowIndex, setEditRowIndex] = useState<number | null>(null);

    const filteredData = useMemo(() => {
        let filtered = data;

        Object.keys(filterInput).forEach((key) => {
            if (filterInput[key]) {
                filtered = filtered.filter((row: any) => row[key].toString().toLowerCase().includes(filterInput[key].toLowerCase()));
            }
        });

        return filtered;
    }, [data, filterInput]);

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    const paginatedData = useMemo(() => {
        const start = currentPage * rowsPerPage;
        return Array.isArray(sortedData) ? sortedData.slice(start, start + rowsPerPage) : [];
    }, [sortedData, currentPage, rowsPerPage]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilterInput({ ...filterInput, [name]: value });
    };

    const handleSort = (key: string) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (e: any) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(0);
    };

    const handleEdit = useCallback((rowIndex: number) => {
        setEditRowIndex(rowIndex);
    }, []);

    const handleSave = useCallback(() => {
        setEditRowIndex(null);
    }, []);

    const handleCancel = useCallback(() => {
        setEditRowIndex(null);
    }, []);

    return {
        filterInput,
        handleFilterChange,
        sortConfig,
        handleSort,
        currentPage,
        handlePageChange,
        rowsPerPage,
        handleRowsPerPageChange,
        paginatedData,
        sortedData,
        editRowIndex,
        handleEdit,
        handleSave,
        handleCancel,
    };
};
