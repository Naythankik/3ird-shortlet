import axios from '../api/axios';

class AuthService {
    /**
     * Handles API errors and throws a structured error object.
     * Logs out the user on 401 errors.
     *
     * @param {any} error - The error object thrown by axios
     * @throws {{message: string, status?: number, data?: any}}
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
     * Logs in a user, stores token and user info in localStorage/sessionStorage.
     * Returns false if the user is an admin.
     *
     * @param {{ email: string, password: string, rememberMe?: boolean }} user
     * @returns {Promise<boolean>} True if login succeeds and user is not admin
     * @throws {{message: string, status?: number, data?: any}}
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
     * Registers a new user account.
     *
     * @param {Object} user - Registration data
     * @returns {Promise<{data: any, status: number}>}
     * @throws {{message: string, status?: number, data?: any}}
     */
    async register(user) {
        try {
            const { data, status } = await axios.post('auth/register', user);
            return { data, status };
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    /**
     * Verifies a newly created account using token and OTP.
     *
     * @param {string} token - Verification token
     * @param {string|number} otp - One-time password
     * @returns {Promise<{data: any, status: number}>}
     * @throws {{message: string, status?: number, data?: any}}
     */
    async verifyAccount(token, otp) {
        try {
            const { data, status } = await axios.post(`auth/verify/${token}`, {otp})
            return { data, status };
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    /**
     * Refreshes the access token using stored refresh credentials.
     *
     * @returns {Promise<string>} New access token
     * @throws {any}
     */
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

    /**
     * Resends verification OTP to the user.
     *
     * @param {string} token - The user’s token
     * @returns {Promise<import('axios').AxiosResponse<any>>}
     * @throws {{message: string, status?: number, data?: any}}
     */
    async requestVerification(token) {
        try {
            return await axios.post(`auth/request-verification/${token}`)
        } catch (error) {
            throw this.handleApiError(error)
        }
    }

    /**
     * Sends a password reset request to the server.
     *
     * @param {{ email: string }} user
     * @returns {Promise<import('axios').AxiosResponse<any>>}
     * @throws {any}
     */
    async forgetPassword(user) {
        try {
            return await axios.post('auth/password/forgot', user);
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    /**
     * Resets the password using a valid token and new password data.
     *
     * @param {string} token - Password reset token
     * @param {{ password: string, confirmPassword: string }} body
     * @returns {Promise<import('axios').AxiosResponse<any>>}
     * @throws {any}
     */
    async resetPassword(token, body){
        try {
           return await axios.post(`auth/password/reset/${token}`, body);
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    /**
     * Fetches the authenticated user's profile data.
     *
     * @returns {Promise<any>} User profile information
     * @throws {{message: string, status?: number, data?: any}}
     */
    async getUserProfile() {
        try {
            const { data } = await axios.get('user/profile');
            return data;
        } catch (error) {
            throw this.handleApiError(error);
        }
    }

    /**
     * Logs out the user and clears all stored session data.
     */
    logout() {
        localStorage.clear() || sessionStorage.clear();
    }

    /**
     * Stores access token in storage based on the rememberMe setting.
     *
     * @param {string} token - Access token
     */
    setToken(token) {
        const storage = localStorage.getItem('rememberMe') === 'true' ? localStorage : sessionStorage;
        storage.setItem('token', token);
    }

    /**
     * Saves full name of user in localStorage.
     *
     * @param {string} firstName
     * @param {string} lastName
     */
    saveFullName(firstName, lastName) {
        localStorage.setItem('fullName', `${firstName} ${lastName}`);
    }

    /**
     * Gets the stored token from either localStorage or sessionStorage.
     *
     * @returns {string|null} Token string or null
     */
    getToken() {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    /**
     * Gets the user's full name from localStorage.
     *
     * @returns {string|null}
     */
    getUser() {
        return localStorage.getItem('fullName');
    }

    /**
     * Gets the stored user ID from localStorage.
     *
     * @returns {string|null}
     */
    getUserId() {
        return localStorage.getItem('userId');
    }

    /**
     * Checks if a user is authenticated (i.e., token exists).
     *
     * @returns {string}
     */
    isAuthenticated() {
        return this.getToken();
    }

    /**
     * Stores the user's ID in localStorage.
     *
     * @param {string} id - User ID
     */
    saveUserId(id) {
        localStorage.setItem('userId', id);
    }
}

const authService = new AuthService();
export default authService;
