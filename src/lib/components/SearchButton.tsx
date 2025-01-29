import React, { useContext } from 'react';
import { PageContext } from '../context';
import { Button } from '@mui/material';

export const SearchButton: React.FC = () => {
    const { state } = useContext(PageContext);

    const handleSearch = () => {
        console.log('Form Search Criteria:', state.searchCriteria);
    };

    return (
        <Button variant="contained" onClick={handleSearch}>
            Search
        </Button>
    );
};
