import { useContext, useCallback } from 'react';
import { GlobalContext } from '../context';
import { GlobalContextType, Domain } from '../types';

export const useGlobalContext = () => {
    const { globalState, globalDispatch } = useContext(GlobalContext) as GlobalContextType;

    const initializeGlobalData = useCallback(
        (domain: Map<string, Domain[]>) => {
            globalDispatch({ type: 'INITIALIZE_DATA', payload: { domain } });
        },
        [globalDispatch]
    );

    const setAuthInfo = useCallback(
        (userInfo: any, token: string) => {
            globalDispatch({ type: 'SET_AUTH_INFO', payload: { userInfo, token } });
        },
        [globalDispatch]
    );

    return { initializeGlobalData, setAuthInfo };
};
