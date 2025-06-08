import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import wishlistService from "../../../services/wishlistService.js";

const EditWishlistModal = ({ wishlist, mode, onClose, onSuccess }) => {
    const [name, setName] = useState(wishlist?.name || '');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState(wishlist?.description || '');
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const title = mode === 'create' ? 'Create a new wishlist' : 'Edit wishlist';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const payload = JSON.stringify({ name: name.trim(), description: description.trim() });

        try {
            const { data, status } = mode === 'create' ?
                await wishlistService.createWishlist(payload) :
                await wishlistService.updateAWishlist(wishlist.id, payload);

            if(status === 201){
                setSuccessMsg(data.message || `Successfully ${title.includes('new') ? 'created' : 'updated'} wishlist`)

                setErrorMsg(null);
                setTimeout(() => {
                    onSuccess?.()
                    onClose()
                }, 2000);
            }

        } catch (error) {
            setErrorMsg(error?.response?.data?.message || error.message || 'An error occurred. Please try again.');
        }finally {
            setLoading(false)
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-blue-500 capitalize">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <FaTimes className="text-gray-500" />
                        </button>
                    </div>
                    {successMsg && <div className="text-green-500 ml-6 py-2">{successMsg}</div>}
                    {errorMsg && <div className="text-red-300 ml-6 py-2">{errorMsg}</div>}
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Wishlist Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg focus:border-blue-500 border-2 border-gray-300 focus-visible:outline-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description (optional)
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                className="w-full px-3 py-2 rounded-lg focus:border-blue-500 border-2 border-gray-300 focus-visible:outline-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button type="submit"
                                className={`flex-1 bg-blue-500 ${loading ? 'bg-opacity-30' : 'bg-opacity-100'} hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200`}
                                disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button type="button" onClick={onClose}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditWishlistModal;
