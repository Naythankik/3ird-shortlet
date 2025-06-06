import axios from "../api/axios.js";

class WishlistService {
    async getWishlist() {
        try{
            const response = await axios.get(`wishlists`);
            return response.data;
        }catch (e) {
            return e.message()
        }
    }

    async getAWishlist(wishlistId){
        try{
            const response = await axios.get(`wishlists/${wishlistId}`);
            return response.data;
        }catch (e) {
            return e.message()
        }
    }

    async deleteAWishlist(wishlistId){
        try{
            const response = await axios.delete(`wishlists/${wishlistId}`);
            return response.data;
        }catch (e) {
            return e.message()
        }
    }

    async updateAWishlist(wishlistId, payload){
        try{
            const response = await axios.put(`wishlists/${wishlistId}`, payload);
            return response.data;
        }catch (e) {
            return e
        }
    }

    async deleteAnApartment(wishlist, apartment){
        try{
            const response = await axios.delete(`wishlists/${wishlist}/apartments/${apartment}`);
            return response.data;
        }catch (e) {
            return e.message()
        }
    }
}
const wishlistService = new WishlistService();
export default wishlistService;
