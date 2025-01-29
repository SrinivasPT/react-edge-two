import { lazy } from 'react';

const Home = lazy(() => import('./features/home/Home'));
const GenericListPage = lazy(() => import('./features/generic/GenericListPage'));
const GenericDetailPage = lazy(() => import('./features/generic/GenericDetailPage'));

const routes = [
    { path: '/', element: <Home />, exact: true },
    { path: '/cluster', element: <GenericListPage entity="cluster" />, exact: true },
    { path: '/cluster/:id', element: <GenericDetailPage entity="cluster" />, exact: true },
];

export default routes;
