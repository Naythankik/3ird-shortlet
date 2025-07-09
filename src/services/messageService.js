import axios from "../api/axios.js";

class MessageService {
    async createChat({receiverId, text}) {
        try{
            const { data } = await axios.post('/chats', {
                receiverId,
                message: text
            })
            return data
        }catch (e) {
            return e?.response?.data || e;
        }
    }

    async getChats (){
        try{
            const { data } = await axios.get('/chats')
            return data;
        }catch (e) {
            return e?.response?.data || e;
        }
    }

    async getMessages (chatId){
        try{
            const { data } = await axios.get(`/chats/${chatId}`)
            return data;
        }catch (e) {
            return e?.response?.data || e;
        }
    }
}
const messageService = new MessageService();
export default messageService;
