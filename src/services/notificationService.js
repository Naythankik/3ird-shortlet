import axios from "../api/axios.js";

class NotificationService {
    async getNotifications() {
        try{
            const { data } = await axios.get('/notifications')
            return data
        }catch (e) {
            return e?.response?.data || e;
        }
    }

    async getNotification (id){
        try{
            const { data } = await axios.patch(`/notifications/${id}/read`)
            return data;
        }catch (e) {
            return e?.response?.data || e;
        }
    }

    async markAllAsRead (){
        try{
            const { data } = await axios.patch('/notifications/read-all')
            return data;
        }catch (e) {
            return e?.response?.data || e;
        }
    }
}
const notificationService = new NotificationService();
export default notificationService;
