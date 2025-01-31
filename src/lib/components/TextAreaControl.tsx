import { TextField } from '@mui/material';
import React from 'react';
import { getNestedValue } from '../common/functions';
import { useControlState } from '../hooks/UseControlState';
import { ControlProps } from '../types/FormConfig';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export const TextAreaControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { controlId, key, dataPath, isVisible, isDisabled, isRequired, state, handleChange } = useControlState(config, parentPath);
    const value = getNestedValue(state.data, dataPath) || '';
    const { hideLabel = false, rows = 3 } = additionalProps;

    if (!isVisible) return null;

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <TextField
                // inputProps={{ id: dataPath }}
                slotProps={{ input: { id: controlId } }}
                value={value}
                onChange={(e) => handleChange(dataPath, e.target.value)}
                required={isRequired}
                disabled={isDisabled}
                hiddenLabel
                variant="filled"
                size="small"
                fullWidth
                multiline
                rows={rows}
                InputLabelProps={{ shrink: true }}
            />
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
