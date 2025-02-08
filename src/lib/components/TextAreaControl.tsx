import { TextareaAutosize } from '@mui/material';
import React from 'react';
import { getNestedValue } from '../common/functions';
import { useControlState } from '../hooks/UseControlState';
import { ControlProps } from '../types/FormConfig';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export const TextAreaControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { controlId, key, dataPath, isVisible, isDisabled, isRequired, state, handleChange } = useControlState(config, parentPath);
    const value = getNestedValue(state.data, dataPath) || '';
    const { hideLabel = false, rows = 6, maxRows = 12 } = additionalProps;

    if (!isVisible) return null;

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <TextareaAutosize
                id={controlId}
                value={value}
                onChange={(e) => handleChange(dataPath, e.target.value)}
                required={isRequired}
                disabled={isDisabled}
                minRows={rows}
                maxRows={maxRows}
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    resize: 'none',
                    paddingRight: 2,
                }}
            />
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
