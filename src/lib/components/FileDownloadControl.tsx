import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, useTheme } from '@mui/material';
import React from 'react';
import { downloadFile } from '../../utils/FileUtils';
import { useControlState } from '../hooks/UseControlState';
import { ControlProps } from '../types/FormConfig';
import { ControlLabel } from './ControlLabel';

export const FileDownloadControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const theme = useTheme();
    const { key, dataPath, isVisible, isDisabled, state } = useControlState(config, parentPath);
    // const fileUrl = getNestedValue(state.data, dataPath);
    const fileUrl =
        'https://moneyloji-documents.s3.ap-south-1.amazonaws.com/opt/document/dev/LoanDocs/37/Applicants/37/ADBCR/1720247102096_image_cropper_1720247086465.png';

    const handleDownload = async () => {
        if (!fileUrl) return;

        try {
            await downloadFile(fileUrl, config.label || 'download');
        } catch (error: any) {
            console.error('Download failed:', error.message);
        }
    };

    if (!isVisible) return null;

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={additionalProps.hideLabel} isRequired={false} />
            <IconButton
                onClick={handleDownload}
                disabled={isDisabled || !fileUrl}
                sx={{
                    color: isDisabled || !fileUrl ? theme.palette.secondary.main : theme.palette.primary.main,
                }}
            >
                <DownloadIcon />
            </IconButton>
        </>
    );
};
