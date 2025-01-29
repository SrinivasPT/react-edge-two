import { Button } from '@mui/material';
import React from 'react';

interface SubmitButtonProps {
    save: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ save }) => {
    const handleSubmit = () => {
        save();
    };

    return (
        <Button variant="contained" onClick={handleSubmit}>
            Save
        </Button>
    );
};
