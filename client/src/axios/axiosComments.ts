import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const axiosComments = axios.create({
    baseURL: 'http://localhost:4001', 
});

axiosComments.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log('Comments Request Sent:', config);
        return config;
    },
    error => {
        console.error('Comments Request Error:', error);
        return Promise.reject(error);
    }
);

axiosComments.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Comments Response Received:', response);
        return response;
    },
    error => {
        console.error('Comments Response Error:', error);
        return Promise.reject(error);
    }
);

export default axiosComments;
