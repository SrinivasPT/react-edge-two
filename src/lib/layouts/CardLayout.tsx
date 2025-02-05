import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';

export const CardLayout: React.FC<{ title: string; widthStyle: string; children: React.ReactNode }> = ({ title, widthStyle, children }) => {
    return (
        <div className={widthStyle} style={{ marginBottom: 20 }}>
            <Card
                elevation={4}
                sx={{
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 16px 24px rgba(0,0,0,0.15)',
                    },
                    borderRadius: '8px',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    padding: '0px',
                }}
            >
                {title && (
                    <CardHeader
                        sx={{
                            bgcolor: 'primary.main',
                            '& .MuiTypography-root': {
                                color: 'primary.contrastText',
                                fontWeight: 500,
                                fontSize: '1.2rem',
                            },
                            py: 2,
                            px: 3,
                            padding: '8px',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        }}
                        title={
                            <Typography
                                variant="h6"
                                sx={{
                                    margin: 0,
                                    width: '100%',
                                    px: 2,
                                }}
                            >
                                {title}
                            </Typography>
                        }
                    />
                )}
                <CardContent
                    sx={{
                        p: 3,
                        '&:last-child': { pb: 3 },
                        color: 'text.primary',
                        backgroundColor: 'background.default',
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    }}
                >
                    {children}
                </CardContent>
            </Card>
        </div>
    );
};
