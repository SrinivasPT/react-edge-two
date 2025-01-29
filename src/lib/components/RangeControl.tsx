import { Box, Typography } from '@mui/material';
import { ControlBuilder, ControlConfig, ControlLabel, ControlProps, FieldErrorControl, getNestedValue, useControlState } from '../index';

export const RangeControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { key, dataPath, isVisible, isDisabled, isRequired, state, handleChange } = useControlState(config, parentPath);
    const value = getNestedValue(state.data, dataPath) || '';
    const { hideLabel = false, hideError = false } = additionalProps;

    if (!isVisible) return null;

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <Box display="flex" alignItems="center">
                <ControlBuilder
                    config={config.controls?.[0] as ControlConfig}
                    parentPath={parentPath}
                    additionalProps={{ hideLabel: true }}
                />
                <Typography variant="body1" sx={{ mx: 1 }}>
                    To
                </Typography>
                <ControlBuilder
                    config={config.controls?.[1] as ControlConfig}
                    parentPath={parentPath}
                    additionalProps={{ hideLabel: true }}
                />
            </Box>
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
