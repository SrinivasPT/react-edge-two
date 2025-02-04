import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App';

const Summarization = lazy(() => import('./features/summarization/Summarization'));
const GenericListPage = lazy(() => import('./features/generic/GenericListPage'));

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route
                        path="summarization/:id"
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <Summarization entity="cluster" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="cluster"
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <GenericListPage entity="cluster" />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
