import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import wishlistService from "../../../services/wishlistService.js";
import ViewWishlistModal from "./ViewWishlistModal.jsx";
import CreateOrUpdateWishlistModal from "./CreateOrUpdateWishlistModal.jsx";
import NoDataComponent from "../../helpers/NoDataComponent.jsx";

const Wishlist = () => {
    const [wishlists, setWishlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWishlist, setSelectedWishlist] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [mode, setMode] = useState('edit');
    const [isCreateOrUpdateModalOpen, setIsCreateOrUpdateModalOpen] = useState(false);

    const fetchWishlists = async () => {
        setLoading(true)
        try {
            const { wishlists }  = await wishlistService.getWishlist()

            setWishlists(wishlists)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching wishlists:', error);
        }finally {
            setLoading(false);
        }
    };

    const handleViewWishlist = async (wishlist) => {
        try{
            const response = await wishlistService.getAWishlist(wishlist.id)
            setSelectedWishlist(response.wishlist)
            setIsViewModalOpen(true);
        }catch (error) {
            console.error('Error updating wishlist:', error);
        }
    }

    const handleModifyButton = (wishlist = null, mode) => {
        setSelectedWishlist({})
        setMode(mode)
        setIsCreateOrUpdateModalOpen(true)
    }

    const handleDeleteWishlist = async (wishlistId) => {
        try{
            await wishlistService.deleteAWishlist(wishlistId)
            fetchWishlists();
        }catch (error) {
            console.error('Error updating wishlist:', error);
        }
    }

    useEffect(() => {
        fetchWishlists();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-blue-500">My Wishlists</h1>
                { Object.keys(wishlists).length < 1 && (
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                        onClick={() => {handleModifyButton(null, 'create')}}
                    >
                        <FaPlus />
                        New Wishlist
                    </button>
                )
                }
            </div>

            {wishlists.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlists.map((wishlist) => (
                        <div key={wishlist.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <div className="flex flex-col gap-2 mb-4">
                                    <h2 className="text-xl font-semibold text-gray-600 truncate">{wishlist.name}</h2>
                                    <span className="italic text-md text-gray-400">{wishlist.description}</span>
                                    <p className="text-gray-400">Apartments: <span className="">{Object.keys(wishlist.apartments).length}</span></p>
                                </div>

                                <div className="flex gap-2 mt-6 text-sm">
                                    <button
                                        onClick={() => {
                                            handleViewWishlist(wishlist)
                                        }}
                                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                                    >View All
                                    </button>
                                    <button
                                        onClick={() => {handleModifyButton(wishlist, 'edit')}}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteWishlist(wishlist.id)}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Wishlist Card */}
                    <button
                        className="group border-2 border-dashed border-gray-300 rounded-xl p-6
                        hover:border-blue-500 transition-colors duration-200 h-full min-h-[300px]
                        flex flex-col items-center justify-center"
                        onClick={() => {handleModifyButton(null, 'create')}}
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center mb-4 transition-colors duration-200">
                            <svg
                                className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-gray-500 group-hover:text-blue-500 font-medium transition-colors duration-200">
                        Create New Wishlist
                    </span>
                    </button>
                </div>
                :
                <NoDataComponent title="No Wishlists" description="You don't have any wishlists yet. Create one now." />
            }

            {isViewModalOpen && selectedWishlist && (
                <ViewWishlistModal
                    wishlist={selectedWishlist}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setSelectedWishlist(null);
                        fetchWishlists()
                    }}
                />
            )}

            {isCreateOrUpdateModalOpen && (
                <CreateOrUpdateWishlistModal
                    wishlist={selectedWishlist}
                    mode={mode}
                    onSuccess={fetchWishlists}
                    onClose={() => {
                        setIsCreateOrUpdateModalOpen(false);
                        setSelectedWishlist(null);
                    }}
                />
            )}

        </div>
    );
};

export default Wishlist;
