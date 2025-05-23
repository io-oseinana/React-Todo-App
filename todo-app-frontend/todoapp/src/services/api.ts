import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;