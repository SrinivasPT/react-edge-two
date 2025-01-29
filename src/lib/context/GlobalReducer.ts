import { GlobalState, DispatchEvent } from '../types';

export const globalReducer = (draft: GlobalState, action: DispatchEvent) => {
    switch (action.type) {
        case 'INITIALIZE_DATA':
            draft.isLoading = false;
            draft.isAuthenticated = true;
            draft.domain = action.payload.domain;
            break;

        case 'SET_AUTH_INFO':
            draft.isAuthenticated = true;
            draft.userInfo = action.payload.userInfo;
            draft.token = action.payload.token;
            break;

        default:
            throw new Error('Invalid Reducer Action. Review your code!');
    }
};
