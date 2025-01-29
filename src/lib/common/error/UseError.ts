import { useContext } from 'react';
import { ErrorContext, ErrorContextProps } from './ErrorProvider';

export const useError = (): ErrorContextProps => {
    const context = useContext(ErrorContext);
    // const { setError } = useError();

    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }

    // const tryCatch = (fn: Function, message: string) => {
    //     return async (...args: any[]) => {
    //         try {
    //             await fn(...args);
    //         } catch (error) {
    //             setError(message);
    //             // Optionally log the error to the server here
    //             // logErrorToServer(error);
    //         }
    //     };
    // };

    return context;
};
