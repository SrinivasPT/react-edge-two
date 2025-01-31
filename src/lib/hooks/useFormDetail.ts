import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import { pageReducer } from '../context';
import { DispatchEvent, FormState, initialState } from '../types';
import { fetchFormData } from './util/fetchFormData';

export const useFormDetail = (id: any, config: any) => {
    const [state, dispatch] = useImmerReducer<FormState, DispatchEvent>(pageReducer, initialState);
    const currentLocation = useLocation();
    const hasRun = useRef(false);

    useEffect(() => {
        if (!id || hasRun.current) return;
        hasRun.current = true;

        console.log('Fetching data for id:', id);
        fetchFormData(config, id)
            .then((newData) => {
                dispatch({
                    type: 'INITIALIZE_DATA',
                    payload: {
                        config: newData.config,
                        data: id === 'new' ? {} : newData.data,
                        internal: { formType: 'GENERIC_DETAIL', actionConfig: config, id, currentLocation },
                    },
                });
            })
            .catch((err) => console.error('Fetch error:', err));
    }, [id, config, currentLocation]);

    return { state, dispatch };
};
