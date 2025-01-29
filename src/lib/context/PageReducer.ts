import { enableMapSet } from 'immer';
import { getNestedValue, setNestedValue } from '../common';
import { DispatchEvent, FormState } from '../types';
enableMapSet();

export const pageReducer = (draft: FormState, action: DispatchEvent) => {
    switch (action.type) {
        case 'INITIALIZE_DATA':
            draft.data = action.payload.data;
            draft.config = action.payload.config;
            draft.internal = action.payload.internal;
            draft.actions = action.payload.actions;
            draft.flags.isDataLoading = false;
            break;

        case 'SET_INTERNAL':
            draft.internal = action.payload;
            break;

        case 'CONTROL_VALUE_CHANGE':
            setNestedValue(draft.data, action.payload.dataPath.split('.'), action.payload.value);
            break;

        case 'SET_ERRORS':
            draft.errors[action.payload.dataPath] = action.payload.errors;
            break;

        case 'SET_SHOW_FORM_ERRORS':
            draft.flags.showFormErrors = true;
            break;

        case 'ARRAY_ADD_ITEM':
            {
                const path = action.payload.dataPath.split('.');
                const array = getNestedValue(draft.data, path);
                if (Array.isArray(array)) {
                    array.push(action.payload.value);
                } else {
                    setNestedValue(draft.data, path, [action.payload.value]);
                }
            }
            break;

        case 'ARRAY_REMOVE_ITEM':
            {
                const array = getNestedValue(draft.data, action.payload.dataPath);
                if (Array.isArray(array)) {
                    array.splice(action.payload.index, 1);
                }
            }
            break;

        case 'ARRAY_ADD_ROW':
            {
                const path = action.payload.dataPath.split('.');
                const lastKey = path.pop();
                let element = path.reduce((acc: any, key: string) => acc[key], draft.data);

                if (!element[lastKey]) {
                    element[lastKey] = [];
                }

                if (!element[lastKey].includes(action.payload.value)) {
                    element[lastKey].push(action.payload.value);
                }
            }
            break;

        default:
            throw new Error('Invalid Reducer Action. Review your code!');
    }
};
