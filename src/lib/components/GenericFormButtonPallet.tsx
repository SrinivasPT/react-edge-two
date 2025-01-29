import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHeaders, hasNonEmptyArrays } from '../common';
import { PageContext, useThemeContext } from '../context';

export const GenericFormButtonPallet = () => {
    const { state, dispatch } = useContext(PageContext);
    const navigate = useNavigate();
    const { setThemeByName } = useThemeContext();

    const buttons = state.config?.buttons.split(',').map((button) => button.trim()) as string[];

    if (buttons.length === 0) return <></>;

    const handleClick = async (action: string) => {
        if (action.toLocaleLowerCase() === 'save') {
            const saveAction = state.internal.actions[action];
            if (saveAction) {
                await saveAction(state, dispatch);
            } else {
                save();
            }
        }
    };

    const save = async () => {
        console.log(state.data);
        if (hasNonEmptyArrays(state.errors)) {
            dispatch({ type: 'SET_SHOW_FORM_ERRORS', payload: true });
            return;
        }

        // Show case theme switch
        // setThemeByName('dark');

        const { id, actionConfig, currentLocation } = state.internal;
        const { entity, url } = actionConfig;
        const actionUrl = id === 'new' ? url : `${url}/${id}`;
        const method = id === 'new' ? 'POST' : 'PUT';

        console.log(state.data);

        try {
            const response = await fetch(actionUrl, {
                method,
                headers: getHeaders(),
                body: state.data[entity], // Send the form data
            });

            if (id === 'new') {
                const newId = response; // Assuming the server returns the new ID
                dispatch({
                    type: 'INITIALIZE_DATA',
                    payload: { config: state.config, data: { ...state.data, id: newId } },
                });
                console.log(`New record created with ID: ${newId}`);
                const newUrl = currentLocation.pathname.replace('new', newId);
                navigate(newUrl);
            }

            return { key: entity, data: response };
        } catch (error) {
            return { key: entity, data: null };
        }
    };

    const toggleTheme = () => {
        setThemeByName('dark');
    };

    return (
        <div>
            {buttons.map((buttonName, index) => (
                <Button key={index} variant="contained" onClick={() => handleClick(buttonName.toLowerCase())}>
                    {buttonName.charAt(0).toUpperCase() + buttonName.slice(1)}
                </Button>
            ))}
            {/* <Button key={'ChangeTheme'} variant="contained" onClick={toggleTheme}>
                Change Theme
            </Button> */}
        </div>
    );
};
