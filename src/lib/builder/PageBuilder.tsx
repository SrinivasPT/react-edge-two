import { Box, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { PageContext } from '../context';
import { FormConfig, GenericFormButtonPallet, isNil } from '../index';
import { SectionBuilder } from './SectionBuilder';

interface PageBuilderProps {
    pageName?: string;
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ pageName }) => {
    const { state } = useContext(PageContext);
    const config: FormConfig = pageName ? (state.config as any)?.[pageName] : state.config;
    const sections = config?.sections;
    const pageDataPath = config?.dataPath || '';

    if (!config) return <>Loading!!!</>;

    return (
        <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
            <Box mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {config?.title}
                </Typography>
            </Box>
            <Box mt={4}>
                {sections?.map((section: string, index: number) => (
                    <SectionBuilder key={index} sectionRefName={section} parentPath={pageDataPath} />
                ))}
            </Box>
            {!isNil(state.config?.buttons) && (
                <Box mt={4}>
                    <GenericFormButtonPallet />
                </Box>
            )}
        </Container>
    );
};
