import axios from '../api/axios';

class UserService {
    /**
     * Update user.
     *
     * @returns {Promise<object>}
     * @throws {{message: string, status?: number, data?: any}}
     * @param body
     */
    async updateUser(body) {
        try {
            const { data: { user } }   = await axios.put('user/profile', body);
            return user;
        } catch (error) {
            throw error
        }
    }
}

const userService = new UserService();
export default userService;
