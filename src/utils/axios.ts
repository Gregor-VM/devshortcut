import axiosStatic from 'axios';

export const axios = axiosStatic.create({
    baseURL: '/api',
    timeout: 50000
});
