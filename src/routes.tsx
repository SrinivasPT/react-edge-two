import { lazy } from 'react';

const Summarization = lazy(() => import('./features/summarization/Summarization'));
const GenericListPage = lazy(() => import('./features/generic/GenericListPage'));
const GenericDetailPage = lazy(() => import('./features/generic/GenericDetailPage'));

const routes = [
    { path: '/summarization/:id', element: <Summarization entity="cluster" />, exact: true },
    { path: '/cluster', element: <GenericListPage entity="cluster" />, exact: true },
    // { path: '/cluster/:id', element: <GenericDetailPage entity="cluster" />, exact: true },
];

export default routes;
