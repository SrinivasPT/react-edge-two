import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';
import { PageContext } from '../context';

export interface FieldErrorControlProps {
    dataPath: string;
}

const ErrorContainer = styled('div')(({ theme }) => ({
    color: theme.palette.error.main,
    fontSize: '0.875rem',
    marginTop: theme.spacing(1),
}));

export const FieldErrorControl: React.FC<FieldErrorControlProps> = ({ dataPath }) => {
    const { state } = useContext(PageContext);
    const errors = state.errors[dataPath] || [];

    if (errors.length === 0) {
        return null;
    }

    return (
        <>
            {state.flags.showFormErrors && (
                <ErrorContainer>
                    {errors.map((error: string, index: number) => (
                        <Typography key={index} variant="body2">
                            {error}
                        </Typography>
                    ))}
                </ErrorContainer>
            )}
        </>
    );
};
