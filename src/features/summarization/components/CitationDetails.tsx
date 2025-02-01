import { Paper, Typography } from '@mui/material';
import { PageBuilder } from 'lib/builder';
import { PageContext } from 'lib/context';
import { useContext } from 'react';

const CitationDetails = () => {
    const { state, dispatch } = useContext(PageContext);

    return (
        <Paper
            className="paper"
            style={{
                width: '95%',
                height: '95%',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <Typography variant="h6">Citation Details</Typography>
            <PageBuilder />
        </Paper>
    );
};

export default CitationDetails;
