import { TextField } from '@mui/material';
import React from 'react';
import { formatDate, getNestedValue } from '../common/functions';
import { useControlState } from '../hooks/UseControlState';
import { ControlProps } from '../types/FormConfig';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export const DateControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { key, dataPath, isVisible, isDisabled, isRequired, state, handleChange } = useControlState(config, parentPath);
    const value = getNestedValue(state.data, dataPath) || '';
    const { hideLabel = false } = additionalProps;

    if (!isVisible) return null;

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <TextField
                inputProps={{ id: dataPath }}
                type="date"
                value={formatDate(value)}
                onChange={(e) => handleChange(dataPath, e.target.value)}
                required={isRequired}
                disabled={isDisabled}
                hiddenLabel
                variant="filled"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
