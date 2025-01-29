import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#90caf9' },
        secondary: { main: '#f48fb1' },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#fff',
            secondary: '#b0b0b0',
            disabled: 'rgba(255, 255, 255, 0.5)',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 500 },
        h2: { fontSize: '2rem', fontWeight: 500 },
        h3: { fontSize: '1.75rem', fontWeight: 500 },
        body1: { fontSize: '1rem' },
        body2: { fontSize: '0.875rem' },
        button: { textTransform: 'none' },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'filled',
                fullWidth: true,
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: '#424242',
                        color: 'rgba(255, 255, 255, 0.8)',
                    },
                    '&.Mui-required .MuiInputBase-input': {
                        backgroundColor: '#fff9c4', // Light yellow background for required fields
                    },
                },
                input: {
                    color: '#fff', // Light color for input values
                    fontWeight: 500, // Slightly bolder font weight for values
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#b0b0b0', // Lighter color for labels
                    fontWeight: 'normal', // Normal font weight for labels
                    marginBottom: '8px', // Add bottom margin for spacing
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Rounded corners for buttons
                    textTransform: 'none', // Keep button text case as is
                    padding: '8px 16px', // Padding for buttons
                    '&:hover': {
                        boxShadow: '0px 4px 20px rgba(255, 255, 255, 0.1)', // Subtle shadow on hover
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '16px', // Add padding to paper components
                    borderRadius: '8px', // Rounded corners for paper components
                },
            },
        },
    },
});
