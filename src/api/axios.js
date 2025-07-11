import axios from 'axios';
import authService from "../services/authService.js";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
    withCredentials: true,
    validateStatus: () => true
});

instance.interceptors.request.use((config) => {
    const token = authService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})
instance.interceptors.response.use(async (response) => {
    const { status, config } = response;

    if (status === 401 || response?.data?.message === "Access denied. Token has expired") {
        const token = authService.getToken();

        if (token) {
            try {
                await authService.refreshToken();
                return instance(config);
            } catch (error) {
                console.log(error)
                authService.logout();
                window.location.reload();
            }
        }
    }

    return response;
});


export default instance;
