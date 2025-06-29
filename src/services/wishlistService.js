import axios from "../api/axios.js";

class WishlistService {
    handleError(e) {
        throw e?.response?.data?.message || e.message || "Something went wrong";
    }

    async getWishlist() {
        try{
            const response = await axios.get(`wishlists`);
            return response.data;
        }catch (e) {
            return this.handleError(e)
        }
    }


    async addApartmentToWishlist(apartmentId) {
        try{
            return await axios.post(`wishlists/${apartmentId}`);
        }catch (e) {
            return this.handleError(e)
        }
    }

    async deleteAnApartment(apartmentId){
        try{
            return await axios.delete(`wishlists/${apartmentId}`);
        }catch (e) {
            return this.handleError(e)
        }
    }
}
const wishlistService = new WishlistService();
export default wishlistService;
