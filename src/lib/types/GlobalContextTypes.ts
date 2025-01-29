import { Domain } from './FormConfig';
import { DispatchEvent } from './PageContextTypes';

export type GlobalState = {
    appSettings?: any;
    domain: Record<string, Domain[]>;
    isAuthenticated?: boolean;
    userInfo?: UserInfo;
    token?: string;
    isLoading?: boolean;
};

export type UserInfo = {
    firstName?: string;
    lastName?: string;
};

export type GlobalContextType = {
    globalState: GlobalState;
    globalDispatch: (dispatchEvent: DispatchEvent) => void;
};

export const initialGlobalState = {
    isLoading: true,
    isAuthenticated: false,
    domain: {},
};

export type GlobalDispatchEvent = {
    type: string;
    payload?: any;
};
