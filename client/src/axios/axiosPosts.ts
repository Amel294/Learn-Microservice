import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const axiosPosts = axios.create({
    baseURL: 'http://localhost:4000',
});

axiosPosts.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log('Posts Request Sent:', config);
        return config;
    },
    error => {
        console.error('Posts Request Error:', error);
        return Promise.reject(error);
    }
);

axiosPosts.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Posts Response Received:', response);
        return response;
    },
    error => {
        console.error('Posts Response Error:', error);
        return Promise.reject(error);
    }
);

export default axiosPosts;
