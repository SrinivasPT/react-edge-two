import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import { pageReducer } from '../context';
import { DispatchEvent, FormState, initialState } from '../types';
import { fetchFormData } from './util/fetchFormData';

export const useFormDetail = (id: any, config: any) => {
    const [state, dispatch] = useImmerReducer<FormState, DispatchEvent>(pageReducer, initialState);

    const currentLocation = useLocation();

    const entity = config['entity'];

    useEffect(() => {
        const fetchData = async () => {
            const newData = await fetchFormData(config, id);
            dispatch({
                type: 'INITIALIZE_DATA',
                payload: {
                    config: newData.config,
                    data: id === 'new' ? {} : newData.data,
                    internal: { formType: 'GENERIC_DETAIL', actionConfig: config, id, currentLocation },
                },
            });
        };

        fetchData();
    }, [id]);

    return { state, dispatch };
};
