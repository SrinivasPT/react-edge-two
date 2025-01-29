import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { SearchButton } from '../components';

export const SearchCriteriaLayout: React.FC<{ title?: string; widthStyle?: string; children: React.ReactNode }> = ({
    title,
    widthStyle,
    children,
}) => {
    return (
        <Paper elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {title && (
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                )}
                <Grid sx={{ flexGrow: 1, padding: '0px !important' }}>{children}</Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <SearchButton />
                </Grid>
            </Box>
        </Paper>
    );
};
