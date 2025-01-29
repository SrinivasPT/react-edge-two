import { Alert, Snackbar } from '@mui/material';

interface ErrorNotificationProps {
    message: string;
    open: boolean;
    onClose: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message, open, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={8000} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
