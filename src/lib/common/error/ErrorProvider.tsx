import { createContext, FC, ReactNode, useState } from 'react';
import { ErrorNotification } from './ErrorNotification';

export interface ErrorContextProps {
    setError: (message: string) => void;
}

export const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);

    const handleError = (message: string) => {
        setError(message);
    };

    const handleClose = () => {
        setError(null);
    };

    // const tryCatch = (fn: Function, setError: (message: string) => void) => {
    //     return (...args: any[]) => {
    //         try {
    //             fn(...args);
    //         } catch (error) {
    //             setError('Failed to fetch data. Please try again later.');
    //             // logErrorToServer(error);
    //         }
    //     };
    // };

    return (
        <ErrorContext.Provider value={{ setError: handleError }}>
            {children}
            <ErrorNotification message={error || ''} open={!!error} onClose={handleClose} />
        </ErrorContext.Provider>
    );
};
