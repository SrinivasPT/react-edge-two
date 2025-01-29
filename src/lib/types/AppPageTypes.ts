export interface AppPageLoadNodes {
    key: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface ApiResult<T> {
    key: string;
    data: T | null;
    error: Error | null;
    loading: boolean;
}
