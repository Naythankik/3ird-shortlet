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

    async getWishlistById(id) {
        try{
            return await axios.get(`wishlists/${id}`);
        }catch (e) {
            return e.message()
        }
    }

    async createWishlist(payload) {
        try{
            return await axios.post(`wishlists`, payload);
        }catch (e) {
            return e.message
        }
    }

    async addApartmentToWishlist(apartmentId, wishlistId) {
        try{
            return await axios.post(`wishlists/${wishlistId}/apartments/${apartmentId}`);
        }catch (e) {
            return e.message
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
            return await axios.put(`wishlists/${wishlistId}`, payload);
        }catch (e) {
            return e.message()
        }
    }

    async deleteAnApartment(wishlist, apartment){
        try{
            return await axios.delete(`wishlists/${wishlist}/apartments/${apartment}`);
        }catch (e) {
            return e.message()
        }
    }
}
const wishlistService = new WishlistService();
export default wishlistService;
