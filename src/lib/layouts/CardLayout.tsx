import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';

export const CardLayout: React.FC<{ title: string; widthStyle: string; children: React.ReactNode }> = ({ title, widthStyle, children }) => {
    return (
        <Box sx={{ mb: 2 }} className={widthStyle}>
            <Card>
                {title && <CardHeader title={<Typography variant="h6">{title}</Typography>} />}
                <CardContent>{children}</CardContent>
            </Card>
        </Box>
    );
};
