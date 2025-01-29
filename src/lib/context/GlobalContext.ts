import { createContext } from 'react';
import { GlobalContextType, DispatchEvent } from '../types';

export const GlobalContext = createContext<GlobalContextType | undefined>({
    globalState: {
        isLoading: true,
        isAuthenticated: false,
        domain: {},
    },
    globalDispatch: (dispatchEvent: DispatchEvent) => {},
});
