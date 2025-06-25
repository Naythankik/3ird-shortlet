import axios from '../api/axios';

class BookingService {
    async createBooking(url, form) {
        try {
            const { data } = await axios.post(url, form);
            return { data };
        } catch (err) {
            return { error: err.response?.data || err };
        }
    }


    async getBookings(url) {
        try{
            const { data } = await axios.get(url);
            return data;
        }catch(err){
            throw err.response?.data || err;
        }
    }

    async getBooking(id) {
        const url = `/bookings/read/${id}`;
        try{
            const { data } = await axios.get(url);
            return data;
        }catch(err){
            return { error: err };
        }
    }
}

const bookingService = new BookingService();
export default bookingService;
