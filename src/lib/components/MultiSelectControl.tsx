import { Cancel } from '@mui/icons-material';
import { Box, Chip, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { ReactNode, useContext, useState } from 'react';
import { getNestedValue } from '../common/functions';
import { GlobalContext } from '../context';
import { useControlState } from '../hooks';
import { ControlProps, Domain, GlobalContextType } from '../types';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export const MultiSelectControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { key, dataPath, isVisible, isRequired, isDisabled, state, handleChange, handleAddItem, handleRemoveItem } = useControlState(
        config,
        parentPath
    );
    const { globalState } = useContext(GlobalContext) as GlobalContextType;
    const value = getNestedValue(state.data, dataPath) || [];
    const options: Domain[] = (globalState.domain[config.domainCategoryCode] as Domain[]) || [];
    const { hideLabel = false } = additionalProps;
    const [expanded, setExpanded] = useState(false);

    if (!isVisible) return null;

    const computeParentValue = () => {
        if (config.parentId) {
            if (config.parentId.includes('.')) {
                return getNestedValue(state.data, config.parentId);
            } else {
                const parentDataPath = `${parentPath}.${config.parentId}`;
                return getNestedValue(state.data, parentDataPath);
            }
        }
        return null;
    };

    const parentValue = computeParentValue();
    const filteredOptions = parentValue ? options.filter((option) => option.parentCode === parentValue) : options;

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleMultiChange = (event: SelectChangeEvent<any>, child: ReactNode) => {
        handleChange(dataPath, event.target.value as string[]);
    };

    const handleDelete = (itemToDelete: string) => (event: React.MouseEvent) => {
        event.stopPropagation(); // Stop event propagation to prevent Select dropdown from opening
        const index = value.indexOf(itemToDelete);
        if (index !== -1) {
            handleRemoveItem(dataPath, index);
        }
    };

    const getDisplayText = (code: string) => {
        const option = options.find((option) => option.domainCode === code);
        return option ? option.displayText : code;
    };

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <Select
                multiple
                value={value}
                onChange={handleMultiChange}
                inputProps={{ id: dataPath }}
                disabled={isDisabled}
                fullWidth
                hiddenLabel
                size="small"
                variant="filled"
                renderValue={(selected) => (
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {(selected as string[]).map((code) => (
                            <Chip
                                key={code}
                                label={getDisplayText(code)}
                                onDelete={handleDelete(code)}
                                deleteIcon={
                                    <IconButton
                                        onMouseDown={(e) => e.stopPropagation()} // Ensure the event is handled before Select opens
                                        onClick={(e) => {
                                            e.stopPropagation(); // Stop event propagation to prevent Select dropdown from opening
                                            handleDelete(code)(e);
                                        }}
                                        size="small"
                                    >
                                        <Cancel />
                                    </IconButton>
                                }
                            />
                        ))}
                        {/* {selected.length > 1 && (
                            <IconButton size="small" onClick={handleToggleExpand}>
                                {expanded ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        )} */}
                    </Box>
                )}
            >
                {filteredOptions.map((option) => (
                    <MenuItem key={option.domainCode} value={option.domainCode}>
                        {option.displayText}
                    </MenuItem>
                ))}
            </Select>
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
