import { Box, Typography } from '@mui/material';

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '22px',
                backgroundColor: '#f0f2f5',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                fontSize: '12px',
                zIndex: 1000,
            }}
        >
            <Typography variant="caption" sx={{ fontSize: 'inherit' }}>
                Cluster Summarizer
            </Typography>
        </Box>
    );
};
