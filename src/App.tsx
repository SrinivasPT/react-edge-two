import { ErrorBoundary, fetcher, useError } from 'lib';
import { Suspense, useCallback, useEffect, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';
import { Outlet } from 'react-router-dom';
import './App.css';
import { GlobalContext, globalReducer } from './lib/context';
import { DispatchEvent, GlobalState, initialGlobalState } from './lib/types';

function App() {
    const [globalState, globalDispatch] = useImmerReducer<GlobalState, DispatchEvent>(globalReducer, initialGlobalState);
    const { setError } = useError();

    const fetchAppData = useCallback(async () => {
        try {
            const domain = await Promise.all([fetcher.get(`DOMAIN_DATA`)]);
            globalDispatch({ type: 'INITIALIZE_DATA', payload: { domain } });
        } catch (error) {
            setError('Failed to fetch data. Please try again later.');
        }
    }, []);

    useEffect(() => {
        fetchAppData();
    }, [fetchAppData]);

    const contextValue = useMemo(() => ({ globalState, globalDispatch }), [globalState, globalDispatch]);

    if (globalState.isLoading) {
        return <h3>Loading</h3>;
    }

    return (
        <GlobalContext.Provider value={contextValue}>
            <Suspense fallback={<h3>Loading route...</h3>}>
                <Outlet />
            </Suspense>
        </GlobalContext.Provider>
    );
}

export default App;
