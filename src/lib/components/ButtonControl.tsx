import { Call, Download, Save } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { PageContext } from '../context';
import { ControlProps } from '../types';

export const ButtonControl: React.FC<ControlProps> = ({ config, parentPath, additionalProps }) => {
    const { state, dispatch } = useContext(PageContext);
    const actionFuncName = additionalProps.action ?? config.key;

    const buttonMap: any = {
        save: <Save fontSize="medium" />,
        telephone: <Call fontSize="medium" />,
        download: <Download fontSize="medium" />,
    };

    const handleClick = async () => {
        const action = state.internal.actions[actionFuncName];
        if (!action) {
            console.log(`Action is missing for ${config.key}`);
            return;
        }
        await action({ parentPath, config, additionalProps, state, dispatch });
    };

    return (
        <>
            {config.typeCode === 'BUTTON' && (
                <Button variant="contained" onClick={handleClick}>
                    {config.label}
                </Button>
            )}

            {config.typeCode === 'ICON_BUTTON' && (
                <IconButton size="small" color="primary" onClick={handleClick}>
                    {buttonMap[config.key]}
                </IconButton>
            )}
        </>
    );
};
