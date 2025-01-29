import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        background: {
            default: '#f4f6f8',
            paper: '#fff',
        },
        text: {
            primary: '#333',
            secondary: '#666',
            disabled: 'rgba(0, 0, 0, 0.38)',
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
        MuiSelect: {
            styleOverrides: {
                select: {
                    '&:focus': {
                        backgroundColor: 'transparent', // Prevents background color change on focus
                    },
                },
                icon: {
                    right: 12,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 0, // Sharp corners for the select control
                },
                input: {
                    padding: '10px 12px', // Adjust padding as needed
                },
                notchedOutline: {
                    borderRadius: 0, // Sharp corners for the outline
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 0, // Sharp corners for the dropdown
                    minWidth: 'auto', // Adjust width to fit the select control
                },
            },
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
                    '&:hover': {
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow on hover
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

export default theme;
