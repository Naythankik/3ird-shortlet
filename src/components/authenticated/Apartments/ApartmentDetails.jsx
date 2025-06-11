import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import apartmentService from "../../../services/apartmentService.js";
import wishlistService from "../../../services/wishlistService.js";
import ReviewList from "../ReviewList.jsx";
import { Heart } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const ApartmentDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const { apartmentId } = useParams();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [apartment, setApartment] = useState(null);
    const [like, setLike] = useState(false);
    const [wishlists, setWishlists] = useState([]);

    async function getWishlists() {
        try{
            const { wishlists } = await wishlistService.getWishlist();
            setWishlists(wishlists);
        }catch(error){
            setError(error?.response?.data?.message || "Something went wrong");
        }
    }

    const fetchApartment = async (id) => {
        try {
            setLoading(true);
            const { apartment: data } = await apartmentService.getAnApartment(id);
            setApartment(data);
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.errors || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleWishlist = async (id) => {
        try{
            const {status} = await wishlistService.addApartmentToWishlist(apartmentId, id);

            if (status === 200) {
                setLike(false);
            }
        }catch(error){
            setError(error?.response?.data?.message || "Something went wrong");
        }

    }

    useEffect(() => {
        getWishlists();
    }, [])

    useEffect(() => {
        fetchApartment(apartmentId);
    }, [apartmentId]);

    useEffect(() => {
        if (queryParams.has('success')) {
            setSuccess('Payment has been verified, check your mail for follow up');
            navigate(location.pathname, { replace: true });
        }

        if (queryParams.has('cancel')) {
            setError('Payment was cancelled. Please try again.');
            navigate(location.pathname, { replace: true });
        }
    }, [location.search]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            {!apartment && !error && <p>No apartment found.</p>}

            {success && <div className="text-green-600 w-[92%] mx-auto">{success}</div>}
            {error && <div className="text-red-600 w-[92%] mx-auto">{error}</div>}

            {apartment && (
                <div className="bg-white p-6 shadow-md rounded-lg max-w-5xl mx-auto mt-4">
                    <div className="flex flex-nowrap overflow-x-scroll justify-evenly gap-6 w-full mb-3"
                         style={{scrollBehavior: 'smooth', scrollbarWidth: 'none'}}>
                        {apartment.images?.map((image, i) => (
                            <img key={i} src={image} alt={image.name}
                                 className="h-96 rounded-lg object-cover min-w-full" />
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-blue-500">
                    <h1 className="text-2xl font-bold mb-2">{apartment.name}</h1>
                        <Link to={`/apartment/${apartmentId}/book/${apartment.name}`}
                              className="border-blue-500 hover:border-white hover:text-white hover:bg-blue-500 border-2 py-2 px-6 rounded-lg">Book apartment</Link>
                    </div>

                    <div className="text-gray-700 mb-4 flex justify-between items-center relative">
                        <p>
                            <strong>Address: </strong>{`${apartment.address.street}, ${apartment.address.city}, ${apartment.address.state}, ${apartment.address.country} (${apartment.address.postcode})`}
                        </p>
                        <button
                            onClick={() => setLike(!like)}
                            className={`text-2xl mr-1 mt-2`}
                            title="Add apartment to wishlist">
                            <Heart className="text-blue-500 hover:fill-blue-500" />
                        </button>
                        {wishlists.length > 0 && (
                            <ul className={`${like ? 'block' : 'hidden'} bg-white opacity-100 border-2 border-blue-200 absolute w-[50%] md:w-[25%] rounded-lg right-0 top-2`}>
                                {wishlists.map((item, i) => (
                                    <li key={i}
                                        onClick={() => handleWishlist(item.id)}
                                        className={`border-blue-200 px-3 py-3 cursor-pointer hover:bg-gray-100 ${i !== wishlists.length - 1 && 'border-b-2'}`}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700">
                            <strong>Price: </strong>
                            ${apartment.price.toLocaleString()}{" "}
                            {apartment.discount && (
                                <span className="text-green-600 ml-2">
                                    ({apartment.discount.percentage}% off!)
                                </span>
                            )}
                        </p>
                    </div>

                    <p className="text-gray-700 mb-4 text-justify">{apartment.description}</p>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {apartment.properties?.map((property, i) => (
                                <li key={i} className="leading-snug">
                                    <span className="text-justify">{property}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">Apartment Rules</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {apartment.rules.map((rule, index) => (
                                <li key={index} className="leading-snug">
                                    <span className="text-justify">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Apartment Location</h3>
                        <div className="w-full h-64 rounded-xl overflow-hidden shadow-md border">
                            <MapContainer center={[apartment.location.lat, apartment.location.lng]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[apartment.location.lat, apartment.location.lng]}>
                                    <Popup>
                                        This is the apartment location.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                    {apartment.reviews.length > 0 && <ReviewList reviews={apartment.reviews} />}
                </div>
            )}
        </div>
    );
};

export default ApartmentDetails;
