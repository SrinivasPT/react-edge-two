import { Autocomplete, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { getNestedValue } from '../common';
import { GlobalContext } from '../context';
import { useControlState } from '../hooks';
import { fetcher } from '../thirdparty';
import { ControlProps, Domain, GlobalContextType } from '../types';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export const AutoCompleteControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { key, dataPath, isVisible, isRequired, isDisabled, state, handleChange } = useControlState(config, parentPath);
    const { globalState } = useContext(GlobalContext) as GlobalContextType;
    const value = getNestedValue(state.data, dataPath) || '';
    const [options, setOptions] = useState<Domain[]>([]);
    const [parentValue, setParentValue] = useState<string | null>(null);

    const { hideLabel = false } = additionalProps;

    useEffect(() => {
        let newParentValue = null;

        if (config?.parentId?.includes('.')) {
            newParentValue = getNestedValue(state.data, config.parentId);
        } else {
            newParentValue = getNestedValue(state.data, `${parentPath}.${config.parentId}`);
        }

        if (newParentValue !== parentValue) {
            setParentValue(newParentValue);
        }
    }, [config.parentId, state.data]);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const apiUrl = parentValue ? `${config.api}/${parentValue}` : config.api;
                const response = await fetcher.get(apiUrl);
                setOptions(response.data || []);
            } catch {
                setOptions([]);
            }
        };

        if (config.api) {
            loadOptions();
        } else {
            const contextOptions = (globalState.domain[config.domainCategoryCode] as Domain[]) || [];
            setOptions(contextOptions);
        }
    }, [parentValue]);

    if (!isVisible) return null;

    const filteredOptions = parentValue ? options.filter((option: any) => option.parentCode === parentValue) : options;
    const validValue = filteredOptions.find((option) => option.domainCode === value) || null;

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <Autocomplete
                value={validValue}
                onChange={(event, newValue) => handleChange(dataPath, newValue ? newValue.domainCode : '')}
                options={filteredOptions}
                getOptionLabel={(option) => option.displayText || ''}
                isOptionEqualToValue={(option, value) => option.domainCode === value.domainCode}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        fullWidth
                        size="small"
                        sx={{
                            '& .MuiInputBase-root': {
                                paddingTop: '10px', // Set padding to align with other controls
                            },
                        }}
                    />
                )}
                disabled={isDisabled}
            />
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
