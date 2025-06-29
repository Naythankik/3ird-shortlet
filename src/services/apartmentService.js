import axios from '../api/axios';

class ApartmentService {
    async getApartments(url) {
        try{
            const { data } = await axios.get(url);
            return data;
        }catch(err){
            throw new Error(err.message);
        }
    }

    async getAnApartment(id) {
        try{
            const { data } = await axios.get(`apartments/read/${id}`);
            return data;
        }catch(err){
            throw new Error(err.message);
        }
    }
}

const apartmentService = new ApartmentService();
export default apartmentService;
