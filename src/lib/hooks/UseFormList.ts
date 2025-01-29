import { pageReducer } from 'lib/context';
import { DispatchEvent, FormState, initialState } from 'lib/types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import { fetchFormData } from './util/fetchFormData';

export const useFormList = (config: any) => {
    const [state, dispatch] = useImmerReducer<FormState, DispatchEvent>(pageReducer, initialState);
    const currentLocation = useLocation();
    const entity = config['entity'];

    useEffect(() => {
        const fetchData = async () => {
            const newData = await fetchFormData(config, null); // No ID required for list
            dispatch({
                type: 'INITIALIZE_DATA',
                payload: {
                    config: newData.config,
                    data: { [config.entity]: newData.data },
                    internal: { formType: 'GENERIC_LIST', actionConfig: config, currentLocation },
                },
            });
        };

        fetchData();
    }, []);

    const save = async () => {
        console.log(JSON.stringify(state.data.product));
    };

    return { save, state, dispatch };
};
