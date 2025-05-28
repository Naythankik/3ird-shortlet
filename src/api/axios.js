import axios from 'axios';
import authService from "../services/authService.js";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
    withCredentials: true
});

instance.interceptors.request.use(async (config) => {
    const token = authService.getToken();
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    // else{
    //     try {
    //         const refreshToken = await authService.refreshToken();
    //         config.headers.authorization = `Bearer ${refreshToken}`;
    //     } catch (error) {
    //         console.error('Error refreshing token:', error);
    //     }
    // }
    return config;
});

// instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         console.log(error)
//         if (error.response?.status === 401) {
//             try {
//                 const refreshToken = await authService.refreshToken();
//                 const config = error.config;
//                 config.headers.authorization = `Bearer ${refreshToken}`;
//                 return instance(config);
//             } catch (refreshError) {
//                 authService.logout();
//                 window.location.reload();
//             }
//         }
//         return Promise.reject(error);
//     }
// );


export default instance;
