import React, {useState} from 'react';
import { FaTimes } from "react-icons/fa";
import wishlistService from "../../../services/wishlistService.js";

const ViewWishlistModal = ({ wishlist, onClose }) => {
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [processingId, setProcessingId] = useState(null);


    const handleRemoveFromWishlist = async (apartmentId) => {
        setProcessingId(apartmentId)
        try {
            const {data} = await wishlistService.deleteAnApartment(wishlist.id, apartmentId);
            setSuccessMsg(data?.message);

            wishlist.apartments = wishlist.apartments.filter(a => a.id !== apartmentId);
            setTimeout(() => {
                setSuccessMsg(null)
                onClose()
            }, 2000)
        }catch (e){
            setErrorMsg(e?.response?.data?.message || e.message || "Something went wrong");
        }finally {
            setProcessingId(null);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-blue-500">{wishlist.name}</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                            <FaTimes className="text-gray-500" />
                        </button>
                    </div>
                </div>

                {/*Error and success message container*/}
                {successMsg && (
                    <div className="ml-6 my-2 bg-green-100 text-green-700 px-4 py-2 rounded">
                        {successMsg}
                    </div>
                )}
                {errorMsg && (
                    <div className="ml-6 my-2 bg-red-100 text-red-700 px-4 py-2 rounded">
                        {errorMsg}
                    </div>
                )}


                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wishlist.apartments.length ? wishlist.apartments?.map((apartment) => (
                            <div
                                key={apartment.id}
                                className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                            >
                                <img
                                    src={apartment.images[0] || 'placeholder-image.jpg'}
                                    alt={apartment.name}
                                    className="w-32 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{apartment.name}</h3>
                                    <p className="text-sm text-gray-500">{`${apartment.location.lat} ${apartment.location.lng}`}</p>
                                    <p className="text-sm text-gray-500">${apartment.price}/month</p>
                                    <button
                                        className="mt-2 text-sm text-red-500 hover:text-red-600"
                                        onClick={() => handleRemoveFromWishlist(apartment.id)}
                                        disabled={processingId === apartment.id}
                                    >
                                        Remove from wishlist
                                    </button>
                                </div>
                            </div>
                        )) :
                            <div className="text-center py-8 text-gray-500">
                                No apartments in this wishlist yet
                            </div>
                        }

                    </div>
                </div>

                </div>
        </div>
    );
};

export default ViewWishlistModal;
