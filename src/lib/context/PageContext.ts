import { createContext } from 'react';
import { PageContextType, DispatchEvent } from '../types';

export const PageContext = createContext<PageContextType>({
    state: {
        flags: { isDataLoading: true, showFormErrors: false },
        errors: {},
    },
    dispatch: (dispatchEvent: DispatchEvent) => {},
});
