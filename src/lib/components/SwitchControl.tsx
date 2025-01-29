import { FormControl, FormControlLabel, FormLabel, Switch } from '@mui/material';
import React from 'react';
import { getNestedValue } from '../common';
import { useControlState } from '../hooks';
import { ControlProps } from '../types/FormConfig';
import { FieldErrorControl } from './FieldErrorControl';

export const SwitchControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { key, dataPath, isVisible, isDisabled, state, handleChange } = useControlState(config, parentPath);
    const storedValue = getNestedValue(state.data, dataPath);
    const value = storedValue === 'Y'; // Convert 'Y' to true, 'N' to false
    const { hideLabel = false } = additionalProps;

    if (!isVisible) return null;

    const handleSwitchChange = (e: any) => {
        const booleanValue = e.target.checked;
        const convertedValue = booleanValue ? 'Y' : 'N'; // Convert true to 'Y', false to 'N'
        handleChange(dataPath, convertedValue);
    };

    return (
        <>
            {!hideLabel && <FormLabel component="legend">{config.label}</FormLabel>}
            <FormControl component="fieldset" fullWidth>
                <FormControlLabel
                    control={<Switch checked={value} onChange={handleSwitchChange} disabled={isDisabled} id={key} />}
                    label={config.label}
                />
            </FormControl>
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
