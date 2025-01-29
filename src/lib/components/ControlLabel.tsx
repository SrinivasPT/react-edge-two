import { InputLabel } from '@mui/material';
import React from 'react';

interface ControlLabelProps {
    htmlFor: string;
    label: string;
    hideLabel?: boolean;
    isRequired?: boolean;
}

export const ControlLabel: React.FC<ControlLabelProps> = ({ htmlFor, label, hideLabel = false, isRequired = false }) => {
    if (hideLabel) return null;

    return (
        <InputLabel htmlFor={htmlFor} sx={{ color: 'balck', fontWeight: 'bold' }}>
            {label}
            {isRequired && <span style={{ color: 'red' }}>*</span>}
        </InputLabel>
    );
};
