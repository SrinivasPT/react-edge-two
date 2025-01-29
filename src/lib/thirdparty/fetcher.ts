import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Get the base URL from environment variables or fall back to a default
const BASE_URL = (import.meta.env.VITE_APP_BASE_URL as string) || 'http://localhost:3001';

export const fetcher = axios.create({
    baseURL: BASE_URL,
});

fetcher.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        const correlationId = uuidv4();

        config.headers.set('Content-Type', 'application/json');
        config.headers.set('X-Correlation-Id', correlationId);
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const refreshToken = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/refresh-token`, {
            refreshToken: localStorage.getItem('refreshToken'),
        });
        localStorage.setItem('jwt', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data.token;
    } catch (error) {
        throw error;
    }
};

fetcher.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axios(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                refreshToken()
                    .then((token) => {
                        fetcher.defaults.headers['Authorization'] = 'Bearer ' + token;
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        processQueue(null, token);
                        resolve(axios(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);
