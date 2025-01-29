import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { getNestedValue } from '../common';
import { GlobalContext } from '../context';
import { useControlState } from '../hooks';
import { ControlProps, Domain, GlobalContextType } from '../types';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export const RadioControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { key, dataPath, isVisible, isDisabled, isRequired, state, handleChange } = useControlState(config, parentPath);
    const { globalState } = useContext(GlobalContext) as GlobalContextType;
    const value = getNestedValue(state.data, dataPath) || '';
    const options: Domain[] = (globalState.domain[config.domainCategoryCode] as Domain[]) || [];
    const [filteredOptions, setFilteredOptions] = useState<Domain[]>(options);
    const { hideLabel = false } = additionalProps;

    useEffect(() => {
        let parentValue: any = null;

        if (config.parentId) {
            if (config.parentId.includes('.')) {
                parentValue = getNestedValue(state.data, config.parentId);
            } else {
                const parentDataPath = `${parentPath}.${config.parentId}`;
                parentValue = getNestedValue(state.data, parentDataPath);
            }

            const newFilteredOptions = options.filter((option) => (parentValue ? option.parentCode === parentValue : true));
            setFilteredOptions(newFilteredOptions);
        }
    }, [config.parentId]);

    if (!isVisible) return null;

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <FormControl component="fieldset" fullWidth>
                <RadioGroup id={dataPath} value={value} onChange={(e) => handleChange(dataPath, e.target.value)} row>
                    {filteredOptions.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={option.domainCode}
                            control={<Radio disabled={isDisabled} />}
                            label={option.displayText}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
