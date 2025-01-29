import { MenuItem, Select } from '@mui/material';
import { fetcher } from 'lib/thirdparty';
import React, { useContext, useEffect, useState } from 'react';
import { getNestedValue } from '../common';
import { GlobalContext } from '../context';
import { useControlState } from '../hooks';
import { ControlProps, Domain, GlobalContextType } from '../types';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export const SelectControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { key, dataPath, isVisible, isRequired, isDisabled, state, handleChange } = useControlState(config, parentPath);
    const { globalState } = useContext(GlobalContext) as GlobalContextType;
    const value = getNestedValue(state.data, dataPath) || '';
    const [options, setOptions] = useState<Domain[]>([]);
    const [parentValue, setParentValue] = useState<string | null>(null);

    const { hideLabel = false } = additionalProps;
    if (!isVisible) return null;

    useEffect(() => {
        let newParentValue = null;

        if (config?.parentId?.includes('.')) {
            newParentValue = getNestedValue(state.data, config.parentId);
        } else {
            newParentValue = getNestedValue(state.data, `${parentPath}.${config.parentId}`);
        }

        if (newParentValue !== parentValue) {
            // TODO: In case it is dependent dropdown, current value need to be set to null
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

    const filteredOptions = parentValue ? options.filter((option: any) => option.parentCode === parentValue) : options;
    const validValue = filteredOptions.some((option) => option.domainCode === value) ? value : '';

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <Select
                value={validValue}
                onChange={(e) => handleChange(dataPath, e.target.value)}
                inputProps={{ id: dataPath }}
                fullWidth
                hiddenLabel
                size="small"
                variant="filled"
            >
                <MenuItem value="">
                    <em>--select--</em>
                </MenuItem>
                {filteredOptions.map((option, index) => (
                    <MenuItem key={index} value={option.domainCode}>
                        {option.displayText}
                    </MenuItem>
                ))}
            </Select>
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
