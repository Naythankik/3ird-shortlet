import axios from 'axios';
import authService from "../services/authService.js";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
    withCredentials: true
});


instance.interceptors.request.use((config) => {
    const token = authService.getToken();
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
})

instance.interceptors.response.use((response) => response, (error) => {
    const message = error?.response?.data?.message;
    if (message.includes("expired" || "token")){
        authService.logout()
        window.location.reload();
    }
    return Promise.reject(error);
})

export default instance;
