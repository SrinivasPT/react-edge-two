import { Box, Typography } from '@mui/material';
import React from 'react';
import { getNestedValue } from '../common/functions';
import { useControlState } from '../hooks/UseControlState';
import { ControlProps } from '../types/FormConfig';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export const LabelControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { key, dataPath, isVisible, isDisabled, isRequired, state, handleChange } = useControlState(config, parentPath);
    const value = getNestedValue(state.data, dataPath) || '';
    const { hideLabel = false } = additionalProps;

    if (!isVisible) return null;

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <Box
                id={dataPath}
                sx={{
                    padding: '8px',
                    // border: '1px solid',
                    // borderColor: 'divider',
                    // borderRadius: 1,
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                }}
                // className={isDisabled ? 'Mui-disabled' : ''}
            >
                <Typography variant="body1">{value}</Typography>
            </Box>
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
