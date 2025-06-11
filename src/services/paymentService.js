import axios from '../api/axios';

class PaymentService {
    async createCheckoutSession (bookingId, body){
        try{
            const { data } = await axios.post(`payments/${bookingId}/create-checkout-session`, body);
            return data
        }catch (e) {
            throw e.response?.data || e;
        }
    }
}

const paymentService = new PaymentService();
export default paymentService;
