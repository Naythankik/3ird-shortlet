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

    async getWishlistById(id) {
        try{
            return await axios.get(`wishlists/${id}`);
        }catch (e) {
            return this.handleError(e)
        }
    }

    async createWishlist(payload) {
        try{
            return await axios.post(`wishlists`, payload);
        }catch (e) {
            return this.handleError(e)
        }
    }

    async addApartmentToWishlist(apartmentId, wishlistId) {
        try{
            return await axios.post(`wishlists/${wishlistId}/apartments/${apartmentId}`);
        }catch (e) {
            return this.handleError(e)
        }
    }

    async getAWishlist(wishlistId){
        try{
            const response = await axios.get(`wishlists/${wishlistId}`);
            return response.data;
        }catch (e) {
            return this.handleError(e)
        }
    }

    async deleteAWishlist(wishlistId){
        try{
            const response = await axios.delete(`wishlists/${wishlistId}`);
            return response.data;
        }catch (e) {
            return this.handleError(e)
        }
    }

    async updateAWishlist(wishlistId, payload){
        try{
            return await axios.put(`wishlists/${wishlistId}`, payload);
        }catch (e) {
            return this.handleError(e)
        }
    }

    async deleteAnApartment(wishlist, apartment){
        try{
            return await axios.delete(`wishlists/${wishlist}/apartments/${apartment}`);
        }catch (e) {
            return this.handleError(e)
        }
    }
}
const wishlistService = new WishlistService();
export default wishlistService;
