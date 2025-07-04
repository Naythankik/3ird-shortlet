import axios from '../api/axios';

class BookingService {
    async createBooking(url, form) {
        try {
            const response = await axios.post(url, form);
            return response.data;
        } catch (error) {
            return {
                error: true,
                message: error.response?.data?.message || error.message || "An unknown error occurred",
                details: error.response?.data || null,
            };
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
