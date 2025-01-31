import { useCallback, useContext } from 'react';
import { getNestedValue, isNil } from '../common/functions';
import { PageContext } from '../context';
import { ControlConfig } from '../types/FormConfig';
import { useValidation } from './UseValidation';

export const useControlState = (config: ControlConfig, parentPath: string) => {
    const { state, dispatch } = useContext(PageContext);

    // const dataPath = config.dataPath || parentPath ? `${parentPath}.${config.key}` : `${config.key}`;
    let dataPath = '';

    if (config?.dataPath) {
        dataPath = config.dataPath;
    } else if (!isNil(parentPath)) {
        dataPath = `${parentPath}.${config?.key}`;
    } else {
        dataPath = config.key;
    }

    const value = getNestedValue(state.data, dataPath) || '';
    const { isHidden, isRequired, isDisabled } = useValidation(value, config, dataPath);

    const handleChange = useCallback(
        (dataPath: string, newValue: any) => {
            dispatch({ type: 'CONTROL_VALUE_CHANGE', payload: { dataPath, value: newValue } });
            // Notes: In case developer attaches an action for this key, trigger that.
            // if (state?.internal?.actions[config.key]) state?.internal?.actions[config.key](state, dispatch);
            if (state?.internal?.actions[config.key]) {
                state.internal.actions[config.key](state, dispatch);
            }
        },
        [dispatch]
    );

    const handleAddItem = useCallback(
        (dataPath: string, item: any) => {
            dispatch({ type: 'ARRAY_ADD_ITEM', payload: { dataPath, value: item } });
        },
        [dispatch]
    );

    const handleRemoveItem = useCallback(
        (dataPath: string, index: number) => {
            dispatch({ type: 'ARRAY_REMOVE_ITEM', payload: { dataPath, index } });
        },
        [dispatch]
    );

    const controlId = `${parentPath ? `${parentPath}-` : ''}${dataPath}`;

    return {
        controlId,
        key: config.key,
        dataPath,
        isVisible: !isHidden,
        isRequired,
        isDisabled,
        state,
        handleChange,
        handleAddItem,
        handleRemoveItem,
        dispatch,
    };
};
