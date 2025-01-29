import { Component, createContext, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

interface ErrorContextProps {
    setError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static contextType = ErrorContext;
    context!: React.ContextType<typeof ErrorContext>;

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log the error to your logging service
        this.logErrorToServer(error, errorInfo);
        // Show user-friendly error message
        this.setErrorContext(`Something went wrong. Please try again later.`);
    }

    logErrorToServer(error: Error, errorInfo: React.ErrorInfo) {
        console.log('Implement LogToServer API for logging errors!!!');
    }

    setErrorContext(message: string) {
        // Assuming ErrorContextProvider is wrapping ErrorBoundary
        if (this.context) {
            this.context.setError(message);
        }
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong. Please try again later.</h1>;
        }

        return this.props.children;
    }
}
