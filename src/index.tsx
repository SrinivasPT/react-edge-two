import { ErrorProvider, ThemeProvider } from 'lib';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ErrorProvider>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Router />
            </QueryClientProvider>
        </ThemeProvider>
    </ErrorProvider>
);
