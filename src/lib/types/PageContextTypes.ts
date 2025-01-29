import { FormConfig } from './FormConfig';

export type PageContextType = {
    state: FormState;
    dispatch: (dispatchEvent: DispatchEvent) => void;
};

export type FormState = {
    config?: FormConfig;
    data?: any;
    searchCriteria?: any;
    flags: FormFlags;
    internal?: any;
    errors?: any;
    actions?: any;
    actionConfig?: any;
};

export type FormFlags = {
    isDataLoading: boolean;
    showFormErrors: boolean;
    [key: string]: any;
};

export type DispatchEvent = {
    type: string;
    payload?: ControlValueChange | InitializeState | any;
};

export type ControlValueChange = {
    dataPath: string;
    name: string;
    value: any;
};

export type InitializeState = {
    config: FormConfig;
    data: any;
};

export type ObjectWithKeys = {
    [key: string]: any;
};

export const initialState: FormState = {
    flags: { isDataLoading: true, showFormErrors: false },
    errors: {},
    actions: {},
};
