import axios from '../api/axios';

class ApartmentService {
    async getApartments() {
        try{
            const { data } = await axios.get('/apartments/read');
            return data;
        }catch(err){
            throw new Error(err.message);
        }
    }
}

const apartmentService = new ApartmentService();
export default apartmentService;
