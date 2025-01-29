import { v4 as uuidv4 } from 'uuid';
import { ObjectWithKeys } from '../types';

export const evaluateExpression = (expression: string, data: any): boolean => {
    try {
        const func = new Function('data', `with (data) { return ${expression}; }`);
        return func(data);
    } catch (error) {
        console.error('Error evaluating expression:', error);
        return false;
    }
};

export const getNestedValue = (obj: any, path: string): any => {
    if (isNil(path)) return obj;

    return path.split('.').reduce((acc, key) => {
        return acc && acc[key] !== 'undefined' ? acc[key] : undefined;
    }, obj);
};

export const setNestedValue = (obj: any, path: string[], value: any) => {
    const lastIndex = path.length - 1;
    for (let i = 0; i < lastIndex; i++) {
        const key = path[i];
        if (!obj[key]) obj[key] = {};
        obj = obj[key];
    }
    obj[path[lastIndex]] = value;
};

export const setNestedValueV2 = (obj: any, nodes: string[], value: any) => {
    let element: any = obj;
    for (let i = 0; i < nodes.length; i++) {
        if (i < nodes.length - 1) {
            const key = nodes[i];
            if (!element[key]) {
                element[key] = isNaN(Number(nodes[i + 1])) ? {} : [];
            }
            element = element[key] as ObjectWithKeys;
        } else {
            if (Array.isArray(element) && !isNaN(Number(nodes[i]))) {
                element[Number(nodes[i])] = value;
            } else {
                element[nodes[i]] = value;
            }
        }
    }
};

export const setNestedValueWithDataPath = (obj: any, dataPath: string, value: any) => {
    setNestedValue(obj, dataPath.split('.'), value);
};

export const getWidthStyle = (widthStyle: string) => {
    switch (widthStyle) {
        case 'FULL':
            return { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 };
        case 'HALF':
            return { xs: 12, sm: 6, md: 6, lg: 6, xl: 6 };
        case 'ONE_THIRD':
            return { xs: 12, sm: 4, md: 4, lg: 4, xl: 4 };
        case 'QUARTER':
            return { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 };
        case 'ONE_FIFTH':
            return { xs: 12, sm: 6, md: 4, lg: 2.4, xl: 2.4 };
        default:
            return { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 };
    }
};

export const hasNonEmptyArrays = (data: any): boolean => {
    for (const key in data) {
        if (Array.isArray(data[key]) && data[key].length > 0) {
            return true;
        }
        if (typeof data[key] === 'object' && data[key] !== null) {
            if (hasNonEmptyArrays(data[key])) {
                return true;
            }
        }
    }
    return false;
};

export const isNil = (value: any) => {
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return true;

    if (typeof value === 'object') {
        if (value instanceof Map) return value.size === 0;
        return Object.keys(value).length === 0 && value.constructor === Object;
    }

    return false;
};

export const getHeaders = () => {
    const token = localStorage.getItem('jwt');
    const correlationId = uuidv4();
    const headers: any = {
        'Content-Type': 'application/json',
        'X-Correlation-Id': correlationId,
        Authorization: `Bearer ${token}`,
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

export const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensuring two digits
    const day = date.getDate().toString().padStart(2, '0'); // Ensuring two digits

    return `${year}-${month}-${day}`; // Formats date in 'yyyy-MM-dd' format
};

export function toSnakeCase(str: string): string {
    return str
        .split(' ')
        .map((word) => word.toLowerCase())
        .join('_');
}

// export const tryCatch = (fn: Function, setError: (message: string) => void) => {
//     return async (...args: any[]) => {
//         try {
//             await fn(...args);
//         } catch (error) {
//             setError('Failed to fetch data. Please try again later.');
//             // logErrorToServer(error);
//         }
//     };
// };
