import axios from '../api/axios';
import authService from "./authService.js";

class BookingService {
    async getBookings(url) {
        try{
            const { data } = await axios.get(url);
            return data;
        }catch(err){
            if(err.status === 401){
                authService.logout()
                window.location.reload();
            }
            throw new Error(err.message);
        }
    }

    async getBooking(id) {
        const url = `/bookings/read/${id}`;
        try{
            const { data } = await axios.get(url);
            return data;
        }catch(err){
            if(err.status === 401){
                authService.logout()
                window.location.reload();
            }
            throw new Error(err.message);
        }
    }
}

const bookingService = new BookingService();
export default bookingService;
