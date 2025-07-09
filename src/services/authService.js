import axios from '../api/axios';

class AuthService {
    /**
     * Handle API errors
     * @param error
     */
    handleApiError(error) {
        const errorData = error.response?.data || error;
        const errorMessage = errorData.message || 'An unexpected error occurred';

        if (error.response?.status === 401) {
            this.logout();
        }

        throw {
            message: errorMessage,
            status: error.response?.status,
            data: errorData
        };
    }

    /**
     * Log in user and save token to local storage
     *
     * @param user
     * @returns {Promise<boolean>}
     */
    async login(user) {
        try {
            const { data : {
                access_token: token,
                user: profile
            } } = await axios.post('auth/login', user);

            // Check if the user is an admin, redirect them to the user page later
            if(profile.role === 'admin') return false;

            if (user.rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            this.setToken(token);
            this.saveFullName(profile.firstName, profile.lastName)
            this.saveUserId(profile.id)

            return true;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    /**
     * Register user and save token to local storage
     *
     * @param user
     * @returns {Promise<{data: any, status: number}>}
     */
    async register(user) {
        try {
            const { data, status } = await axios.post('auth/register', user);
            return { data, status };
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    async verifyAccount(token, otp) {
        try {
            const { data, status } = await axios.post(`auth/verify/${token}`, {otp})
            return { data, status };
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    async refreshToken() {
        try {
            const { data: { access_token } } =
                await axios.post('auth/refresh-token');
            this.setToken(access_token);
            return access_token;
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    async requestVerification(token) {
        try {
            return await axios.post(`auth/request-verification/${token}`)
        } catch (error) {
            throw this.handleApiError(error)
        }
    }

    async forgetPassword(user) {
        try {
            return await axios.post('auth/password/forgot', user);
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    async resetPassword(token, body){
        try {
           return await axios.post(`auth/password/reset/${token}`, body);
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    logout() {
        localStorage.clear()
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    saveFullName(firstName, lastName) {
        localStorage.setItem('fullName', `${firstName} ${lastName}`);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUser() {
        return localStorage.getItem('fullName');
    }

    getUserId() {
        return localStorage.getItem('userId');
    }

    isAuthenticated() {
        return !!this.getToken();
    }

    saveUserId(id) {
        localStorage.setItem('userId', id);
    }
}

const authService = new AuthService();
export default authService;
