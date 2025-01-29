import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { uploadFile } from '../../utils/FileUtils';
import { useControlState } from '../hooks/UseControlState';
import { ControlProps } from '../types/FormConfig';
import { ControlLabel } from './ControlLabel';
import { FieldErrorControl } from './FieldErrorControl';

export const FileUploadControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { key, dataPath, isVisible, isDisabled, isRequired, state, handleChange } = useControlState(config, parentPath);
    const { hideLabel = false } = additionalProps;
    const [file, setFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const selectedFile = files[0];
            setFile(selectedFile);
            try {
                const fileUrl = await uploadFile(selectedFile);
                handleChange(dataPath, fileUrl);
                setUploadError(null);
            } catch (error: any) {
                setUploadError(error.message);
            }
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        handleChange(dataPath, null);
    };

    if (!isVisible) return null;

    return (
        <>
            <ControlLabel htmlFor={dataPath} label={config.label} hideLabel={hideLabel} isRequired={isRequired} />
            <Box
                sx={{
                    border: '2px dashed grey',
                    padding: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 1,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <input type="file" id={dataPath} style={{ display: 'none' }} disabled={isDisabled} onChange={handleFileChange} />
                <label htmlFor={dataPath}>
                    <Button variant="contained" component="span" disabled={isDisabled} startIcon={<CloudUploadIcon />}>
                        {file ? 'Change File' : 'Upload File'}
                    </Button>
                </label>
                {file && (
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">{file.name}</Typography>
                        <IconButton size="small" onClick={handleRemoveFile} disabled={isDisabled}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
                {uploadError && (
                    <Typography variant="body2" color="error">
                        {uploadError}
                    </Typography>
                )}
            </Box>
            <FieldErrorControl dataPath={dataPath} />
        </>
    );
};
