import { ErrorBoundary, fetcher, useError } from 'lib';
import { Suspense, useCallback, useEffect, useMemo } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import './App.css';
import { GlobalContext, globalReducer } from './lib/context';
import { DispatchEvent, GlobalState, initialGlobalState } from './lib/types';
import routes from './routes';

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
    }, [globalState.isLoading]);

    useEffect(() => {
        fetchAppData();
    }, [fetchAppData]);

    const contextValue = useMemo(() => ({ globalState, globalDispatch }), [globalState, globalDispatch]);

    if (globalState.isLoading) {
        return <h3>Loading</h3>;
    }

    return (
        <ErrorBoundary>
            <GlobalContext.Provider value={contextValue}>
                <Router>
                    <Suspense fallback={<h3>Loading route...</h3>}>
                        <Routes>
                            {routes.map((route, index) => {
                                const { path, element, children } = route as any;
                                return (
                                    <Route key={index} path={path} element={element}>
                                        {children &&
                                            children.map((child: any, childIndex: any) => (
                                                <Route key={`${index}-${childIndex}`} path={child.path} element={child.element} />
                                            ))}
                                    </Route>
                                );
                            })}
                        </Routes>
                    </Suspense>
                </Router>
            </GlobalContext.Provider>
        </ErrorBoundary>
    );
}

export default App;
