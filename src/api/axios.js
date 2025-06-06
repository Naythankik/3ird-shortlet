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
}, (error) => {
    return Promise.reject(error);
})

instance.interceptors.response.use((response) => response, async (error) => {
    const response = error?.response;

    if (response.status === 401 || response?.data.message === "Access denied. Token has expired"){
        const token = authService.getToken();
        if(token){
            try {
                const response = await authService.refreshToken()
                console.log(response)
            } catch (error) {
                authService.logout()
                window.location.reload();
            }
        }

    }
    return Promise.reject(error);
})

export default instance;
