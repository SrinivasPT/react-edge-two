import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#808080' },
        background: { default: '#f4f6f8', paper: '#fff' },
        text: { primary: '#333', secondary: '#666', disabled: 'rgba(0, 0, 0, 0.38)' },
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
            defaultProps: { variant: 'filled', fullWidth: true },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.06)',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: '#e0e0e0',
                        color: 'rgba(0, 0, 0, 0.8)',
                    },
                    '&.Mui-required .MuiInputBase-input': {
                        backgroundColor: '#fff9c4', // Light yellow background for required fields
                    },
                },
                input: {
                    color: '#333', // Dark color for input values
                    fontWeight: 500, // Slightly bolder font weight for values
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#666', // Lighter color for labels
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
                    backgroundColor: '#1976d2 !important', // Default background color with higher specificity
                    color: '#FFFFFF !important', // Default text color with higher specificity
                    '&:hover': {
                        backgroundColor: '#1565c0 !important', // Background color on hover with higher specificity
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1) !important', // Subtle shadow on hover with higher specificity
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
        MuiMenu: {
            styleOverrides: {
                paper: {
                    padding: '0px', // Remove padding from the dropdown menu
                },
            },
        },
    },
});
