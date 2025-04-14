import axios from '../api/axios';

class AuthService {
    async login(user) {

        try {
            const { data: {
                access_token: token,
                admin
            }} = await axios.post('auth/login', user);

            //Check if the user is an admin, redirect them to the user page later
            if(admin.role === 'admin'){
                return false;
            }

            this.saveToken(token);
            this.saveFullName(admin.firstName, admin.lastName)
            return true;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    async register(user) {
        try {
            const response = await axios.post('auth/register', user);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    logout() {
        localStorage.clear()
    }

    saveToken(token) {
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

    isAuthenticated() {
        return !!this.getToken();
    }
}

const authService = new AuthService();
export default authService;
