import instance from "../api/axios.js";

class AdminService {

    async loginAdmin(body) {
        try{
            const { data : {
                access_token: token,
                admin, success
            } } = await instance.post(`admin/auth/login`, JSON.stringify(body));

            this.setToken(token);
            this.saveFullName(admin.firstName, admin.lastName)

            return { data: admin, success};
        }catch (e) {
          return e.response?.data || e;
        }
    }

    setToken(token) {
        localStorage.setItem('aToken', token);
    }

    saveFullName(firstName, lastName) {
        localStorage.setItem('aFullName', `${firstName} ${lastName}`);
    }

    getAToken() {
        return localStorage.getItem('aToken');
    }

    getAdmin() {
        return localStorage.getItem('aFullName');
    }

    isAdminAuthenticated() {
        return !!this.getAToken();
    }
}

export default new AdminService()
