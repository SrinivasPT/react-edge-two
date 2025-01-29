import { useContext, useEffect, useMemo } from 'react';
import { evaluateExpression } from '../common/functions';
import { PageContext } from '../context';
import { ControlConfig } from '../types';

export const useValidation = (value: any, config: ControlConfig, dataPath: string) => {
    const { state, dispatch } = useContext(PageContext);

    const isHidden = useMemo(() => {
        return config?.hideExpression ? evaluateExpression(config?.hideExpression, state.data) : config?.visibilityTypeCode === 'HIDDEN';
    }, [state.data]);

    const isRequired = useMemo(() => {
        return config?.requiredExpression
            ? evaluateExpression(config?.requiredExpression, state.data)
            : config?.visibilityTypeCode === 'EDITABLE_REQUIRED';
    }, [state.data]);

    const isDisabled = useMemo(() => {
        return config?.disabledExpression
            ? evaluateExpression(config?.disabledExpression, state.data)
            : config?.visibilityTypeCode === 'DISABLED';
    }, [state.data]);

    useEffect(() => {
        const newErrors: string[] = [];

        if (isRequired && !value) {
            newErrors.push(`${config?.label ?? 'field'} is required`);
        }

        if (config.pattern && !config.pattern.test(value)) {
            newErrors.push('Invalid format');
        }

        if (config.minLength && value.length < config.minLength) {
            newErrors.push(`Minimum length is ${config.minLength}`);
        }

        if (config.maxLength && value.length > config.maxLength) {
            newErrors.push(`Maximum length is ${config.maxLength}`);
        }

        dispatch({ type: 'SET_ERRORS', payload: { dataPath, errors: newErrors } });
    }, [value]);

    return { isHidden, isRequired, isDisabled };
};
