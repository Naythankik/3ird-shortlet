import { useLocation, useNavigate, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import apartmentService from "../../../services/apartmentService.js";
import wishlistService from "../../../services/wishlistService.js";
import Spinner from "../../../components/Spinner.jsx";
import {toast, ToastContainer} from 'react-toastify';
import NoDataComponent from "../../../components/helpers/NoDataComponent.jsx";
import { FaXmark} from "react-icons/fa6";
import {FaCaretLeft, FaCaretRight} from "react-icons/fa";
import {BsChat} from "react-icons/bs";
import FeatureDisplay from "../../../components/FeatureDisplay.jsx";
import {HeartIcon} from "lucide-react";

const ApartmentDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const { apartmentId } = useParams();
    const [loading, setLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const [apartment, setApartment] = useState(null);
    const [like, setLike] = useState(false);
    const [wishlists, setWishlists] = useState([]);
    const [wishlisted, setWishlisted] = useState([]);

    async function getWishlists() {
        try{
            const { wishlists } = await wishlistService.getWishlist();
            const allApartmentIds = [];

            // Loop through the list and append the apartment key-value to an array
            // wishlists.forEach(wishlist => {
            //     if (Array.isArray(wishlist.apartments) && wishlist.apartments.length) {
            //         wishlist.apartments.forEach(apartment => {
            //             allApartmentIds.push(apartment.id);
            //         });
            //     }
            // });

            setWishlisted(allApartmentIds);
            setWishlists(wishlists);
        }catch(error){
            console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    const fetchApartment = async (id) => {
        try {
            setLoading(true);
            const { apartment: data } = await apartmentService.getAnApartment(id);
            setApartment(data);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.errors || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleWishlist = async (id) => {
        try{
            const {status} = await wishlistService.addApartmentToWishlist(apartmentId, id);

            if (status === 200) {
                toast.success("Apartment added to wishlist");
                await getWishlists();
                setLike(false);
            }
        }catch(error){
            toast.error(error?.response?.data?.message || "Something went wrong");
        }

    }

    useEffect(() => {
        fetchApartment(apartmentId);
        getWishlists();
    }, [apartmentId]);

    useEffect(() => {
        if (queryParams.has('success')) {
            toast.success('Payment has been verified, check your mail for follow up');
            // navigate(location.pathname, { replace: true });
        }

        if (queryParams.has('cancel')) {
            toast.error('Payment was cancelled. Please try again.');
            navigate(location.pathname, { replace: true });
        }
    }, [location.search]);

    const isWishlisted = wishlisted.includes(apartmentId);
    const handleImageDisplay = (imageIndex) => {
        setShowModal(true);
        setCurrentImage(imageIndex)
    }
    const totalImages = apartment?.images?.length;

    const viewNextImage = (currentIndex) => {
        const nextIndex = (currentIndex + 1) % totalImages;
        setCurrentImage(nextIndex);
    };

    const viewPreviousImage = (currentIndex) => {
        const nextIndex = (currentIndex - 1 + totalImages) % totalImages;
        setCurrentImage(nextIndex);
    };


    if (loading) {
        return (
            <Spinner />
        )
    }

    return (
        <div>
            {/*Modal display for images */}
            <div className={`${showModal ? 'flex' : 'hidden'} absolute bg-black opacity-95 w-full h-full top-0 left-0 z-50`}>
                <FaXmark className="absolute top-6 right-6 text-3xl cursor-pointer text-white" onClick={() => setShowModal(false)} />
                    <button
                        onClick={() => viewPreviousImage(currentImage)}
                        className="absolute text-white top-1/2 left-10 translate-y-1/2"><FaCaretLeft className="text-xl md:text-4xl" /></button>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
                        <img src={apartment?.images[currentImage]} alt={apartment?.name} className="rounded-lg w-full h-full object-cover" />
                    </div>

                    <button
                        onClick={() => viewNextImage(currentImage)}
                        className="absolute text-white top-1/2 right-10 translate-y-1/2">
                        <FaCaretRight className="text-xl md:text-4xl" />
                    </button>
            </div>
            {apartment ?
                <>
                    <section title="Apartment image display" className="mt-5">
                        {apartment?.images?.length > 0 && (
                            <div className="flex flex-col lg:flex-row gap-3 h-auto md:h-[400px]">
                                {/* ─── Hero / current image ─────────────────────────────── */}
                                <div className="w-full lg:w-1/2">
                                    <img
                                        key="0"
                                        src={apartment.images[0]}
                                        alt={apartment.name}
                                        onClick={() => {handleImageDisplay(0)}}
                                        className="h-80 lg:h-full w-full object-cover rounded-lg cursor-pointer"
                                    />
                                </div>

                                {/* ─── Thumbnails grid ──────────────────────────────────── */}
                                {apartment.images.length > 1 && (
                                    <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3">
                                        {apartment.images
                                            .filter((_, index) => index > 0 && index < 5)
                                            .map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`${apartment.name} ${index + 1}`}
                                                    onClick={() => handleImageDisplay(index + 1)}
                                                    className="h-40 lg:h-48 w-full object-cover rounded-lg cursor-pointer"
                                                />
                                            ))}
                                    </div>

                                )}
                            </div>
                        )}
                    </section>
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-bold text-blue-500 leading-10">{apartment.name}</h1>
                            <p className="text-lg text-gray-700">Location: <span className="italic text-gray-500">{`${apartment.address.street}, ${apartment.address.city}, ${apartment.address.country}`}</span></p>
                        </div>
                        <button><HeartIcon className="text-blue-400 hover:fill-blue-400" /></button>
                    </div>

                    <section className="mt-5 flex-col md:flex-row flex gap-5 items-start">
                        <div className="w-full md:w-3/4 flex flex-col border-2 rounded-lg  p-4 bg-white gap-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <img src={apartment?.host?.profilePicture} alt={apartment.host.name} className="rounded-full mr-2 w-10 h-10 object-cover" />
                                    <p className="text-xl font-medium leading-snug">{apartment.host.firstName}</p>
                                    <span className="text-gray-500 font-medium">(Host)</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <BsChat />
                                    <p>Chat with apartment host</p>
                                </div>
                            </div>
                            <div className="border-t-2 border-b-2 my-2 py-4">
                                <h2 className="text-2xl font-semibold leading-loose text-gray-800">Description</h2>
                                <p className="text-justify">{apartment.description}</p>
                            </div>

                            <div className="border-t-2 border-b-2 my-2 py-4">
                                <h2 className="text-2xl font-semibold leading-loose text-gray-800">Apartment Items</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 capitalize">
                                    {apartment?.properties.map((property, index) => (
                                        <div key={index} className="flex justify-between">
                                            <p>{property.name}</p>
                                            <span>{property.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t-2 border-b-2 my-2 py-4">
                                <h2 className="text-2xl font-semibold leading-loose text-gray-800">Special Features</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[...apartment?.features].map((feature, index) => (
                                        <FeatureDisplay key={index} title={feature} />
                                        ))}
                                </div>
                            </div>

                            <div className="border-t-2 border-b-2 my-2 py-4">
                                <h2 className="text-2xl font-semibold leading-loose text-gray-800">Apartment Rule(s)</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {apartment?.rules.map((rule, index) => (
                                            <li key={index}>{rule}</li>
                                        ))}
                                    </ul>
                            </div>

                            <div className="border-t-2 border-b-2 my-2 py-4">
                                <p className="font-semibold text-2xl text-gray-800">Caution Fee</p>
                                <p className="font-medium text-lg">Amount: <span className="text-gray-500">{`NGN${apartment.cautionFee.toLocaleString()} /booking`}</span></p>
                                <p className="font-medium text-lg">Payment method: <span className="text-gray-500">
                                        Both options are available (Card or Bank Transfer)
                                        Refund of caution fee to be paid 24 hrs after checkout.
                                    </span>
                                </p>
                            </div>

                            <div className="border-t-2 border-b-2 my-2 py-4">
                                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Location</h3>
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                                    {/* You can embed Google Maps iframe here */}
                                    Google Map Coming Soon
                                </div>
                            </div>

                        </div>
                        <div className="w-full md:w-1/4 border-2 rounded-lg p-4 bg-white">
                            <p className="text-2xl font-bold">{`NGN ${apartment.price.toLocaleString()}`} <span className="text-sm font-medium text-gray-500">per night</span></p>
                            <form className="mt-3 flex flex-col gap-4">
                                <div className="border-2 rounded-lg">
                                    <div className="grid grid-cols-2">
                                        <div className="p-2 rounded-bl-lg border-b-2 border-r-2">
                                            <label className="capitalize text-gray-400">check-in</label>
                                            <input type="date" className="w-full" />
                                        </div>

                                        <div className="p-2 rounded-br-lg border-b-2">
                                            <label className="capitalize text-gray-400">check-out</label>
                                            <input type="date" className="w-full" />
                                        </div>

                                    </div>
                                    <div className="p-2">
                                        <label className="text-gray-500 mb-3">Guests</label>
                                        <input type="text" className="w-full border-2 border-gray-300 rounded-lg p-3" />
                                    </div>
                                </div>
                                <button className="w-full bg-blue-500 rounded-md p-3 text-white">Reserve</button>
                            </form>
                            <p className="text-gray-400 my-4">
                                This accommodation listing has been set to be available for 30 days.
                                You can reserve this apartment for 30 days from the date of booking.
                            </p>
                        </div>
                    </section>
                </>
                :
                <NoDataComponent title="Apartment not found" description="The apartment you are looking for does not exist." />
            }
            <ToastContainer pauseOnHover/>
        </div>
    );
};

export default ApartmentDetails;
