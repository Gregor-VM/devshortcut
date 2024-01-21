import axiosStatic from 'axios';

export const axios = axiosStatic.create({
    baseURL: 'http://localhost:5173/api',
    timeout: 50000
});