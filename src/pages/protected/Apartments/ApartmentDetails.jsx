import { useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
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
import ReviewList from "../ReviewList.jsx";

const ApartmentDetails = () => {
    /* ------------------------------- ROUTING ------------------------------- */
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { apartmentId } = useParams();
    const [cautionFee, setCautionFee] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [price, setPrice] = useState(0)
    const [nights, setNights] = useState(1)

    /* -------------------------------- STATE -------------------------------- */
    const [loading, setLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [apartment, setApartment] = useState(null);
    const [wishlistIds, setWishlistIds] = useState([]);

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const today = new Date().toISOString().split("T")[0];

    /* ---------------------------- DATA FETCHERS ---------------------------- */
    const fetchApartment = useCallback(async () => {
        if (!apartmentId) return;
        try {
            setLoading(true);
            const { apartment: data } = await apartmentService.getAnApartment(apartmentId);
            setCautionFee(data.cautionFee)
            setPrice(data.price)
            setTotalPrice(
                (Number(data.price) + Number(data.cautionFee)).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            );
            setApartment(data);
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.errors || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [apartmentId]);

    const fetchWishlists = useCallback(async () => {
        try {
            const { wishlists } = await wishlistService.getWishlist();
            // /** Flatten every apartment.id inside every wishlist into a single array */
            const ids = wishlists?.flatMap((w) =>
                Array.isArray(w.apartments) ? w.apartments.map((a) => a.id) : []
            );
            setWishlistIds(ids);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }, []);

    /* ------------------------------ LIFECYCLE ------------------------------ */
    useEffect(() => {
        fetchApartment();
        fetchWishlists();
    }, [fetchApartment, fetchWishlists]);

    /* React to Checkin and Checkout dates */
    useEffect(() => {
        if (checkIn && checkOut) {
            const inDate = new Date(checkIn);
            const outDate = new Date(checkOut);
            const diffInMs = outDate - inDate; // Difference in milliseconds
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            setNights(diffInDays);
            setPrice(diffInDays * apartment.price);
            setTotalPrice((Number(diffInDays * apartment.price) + Number(apartment.cautionFee)).
                toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            );
        }
    }, [checkOut, checkIn]);

    /* React to Stripe checkout callbacks */
    useEffect(() => {
        if (queryParams.has("success")) {
            toast.success("Payment has been verified – check your email for details.");
        }
        if (queryParams.has("cancel")) {
            toast.error("Payment was cancelled. Please try again.");
            navigate(location.pathname, { replace: true });
        }
    }, [queryParams, navigate, location.pathname]);

    /* ------------------------- IMAGE NAVIGATION LOGIC ------------------------ */
    const totalImages = apartment?.images?.length || 0;

    const handleImageDisplay = (imageIndex) => {
        setShowModal(true);
        setCurrentImage(imageIndex)
    }

    const viewNextImage = () => {
        setCurrentImage((prev) => (prev + 1) % totalImages);
    };

    const viewPreviousImage = () => {
        setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
    };

    const isWishlisted = wishlistIds.includes(apartmentId);

    const toggleWishlist = async () => {
        try {
            const { status } = isWishlisted ? await wishlistService.deleteAnApartment(apartmentId) : await wishlistService.addApartmentToWishlist(apartmentId);
            if (status === 201 || status === 200) {
                toast.success(
                    isWishlisted ? "Apartment removed from wishlist" : "Apartment added to wishlist"
                );
                fetchWishlists();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    /* -------------------------------- RENDER -------------------------------- */
    if (loading) return <Spinner />;
    if (!apartment) return <NoDataComponent title="Apartment not found" description="The apartment you are looking for does not exist." />;

    return (
        <div className="relative pb-12">
            {/* ------------------------------ Image Modal ----------------------------- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
                    <FaXmark
                        className="absolute top-6 right-6 text-3xl text-white cursor-pointer"
                        onClick={() => setShowModal(false)}
                    />

                    <button onClick={viewPreviousImage} className="absolute left-10 text-white top-1/2 -translate-y-1/2">
                        <FaCaretLeft className="text-xl md:text-4xl" />
                    </button>

                    <img
                        src={apartment.images[currentImage]}
                        alt={apartment.name}
                        className="w-full max-w-lg rounded-lg object-cover"
                    />

                    <button onClick={viewNextImage} className="absolute right-10 text-white top-1/2 -translate-y-1/2">
                        <FaCaretRight className="text-xl md:text-4xl" />
                    </button>
                </div>
            )}
            {/* ---------------------------- Hero Images ---------------------------- */}

            {apartment ?
                <>
                    <section className="mt-5">
                        {totalImages > 0 && (
                            <div className="flex flex-col lg:flex-row gap-3 h-full lg:h-[400px]">
                                {/* Main Image */}
                                <div className="w-full lg:w-1/2">
                                    <img
                                        key="0"
                                        src={apartment.images[0]}
                                        alt={apartment.name}
                                        onClick={() => handleImageDisplay(0)}
                                        className="h-80 lg:h-full w-full object-cover rounded-lg cursor-pointer"
                                    />
                                </div>

                                {/* Thumbnails */}
                                {totalImages > 1 && (
                                    <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3">
                                        {apartment.images
                                            .slice(1, 5) // indices 1-4 inclusive
                                            .map((image, idx) => (
                                                <img
                                                    key={image}
                                                    src={image}
                                                    alt={`${apartment.name} ${idx + 2}`}
                                                    onClick={() => handleImageDisplay(idx + 1)}
                                                    className="h-40 lg:h-48 w-full object-cover rounded-lg cursor-pointer"
                                                />
                                            ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    {/* --------------------------- Heading/Like --------------------------- */}
                    <div className="flex justify-between items-center mt-3">
                        <div>
                            <h1 className="text-3xl font-bold text-blue-500 leading-10">
                                {apartment.name}
                            </h1>
                            <p className="text-lg text-gray-700">
                                Location: <span className="italic text-gray-500">{`${apartment.address.street}, ${apartment.address.city}, ${apartment.address.country}`}</span>
                            </p>
                        </div>

                        <button onClick={toggleWishlist} title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
                            <HeartIcon className={isWishlisted ? "fill-blue-500 text-blue-500" : "text-blue-400 hover:fill-blue-400"} size={28} />
                        </button>
                    </div>

                    {/* ---------------------------- Main Content ---------------------------- */}
                    <section className="mt-5 flex flex-col md:flex-row gap-5 items-start">
                        {/* ------------------------- Left – Info Card ------------------------- */}
                        <div className="w-full md:w-3/4 flex flex-col border-2 rounded-lg p-4 bg-white gap-6">
                            {/* Host */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={apartment?.host?.profilePicture}
                                        alt={apartment.host.firstName}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <p className="text-xl font-medium leading-snug">
                                        {apartment.host.firstName} <span className="text-gray-500 font-medium">(Host)</span>
                                    </p>
                                </div>
                                <button className="flex items-center gap-2 text-blue-600 hover:underline">
                                    <BsChat /> Chat with host
                                </button>
                            </div>

                            {/* Description */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Description</h2>
                                <p className="text-justify whitespace-pre-line">{apartment.description}</p>
                            </section>

                            {/* Items */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Apartment Items</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 capitalize">
                                    {apartment?.properties?.map((prop) => (
                                        <div key={prop.name} className="flex justify-between">
                                            <span>{prop.name}</span>
                                            <span>{prop.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Features */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Special Features</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {apartment?.features?.map((feature) => (
                                        <FeatureDisplay key={feature} title={feature} />
                                    ))}
                                </div>
                            </section>

                            {/* Rules */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Apartment Rule(s)</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 list-disc list-inside">
                                    {apartment?.rules?.map((rule) => (
                                        <li key={rule}>{rule}</li>
                                    ))}
                                </ul>
                            </section>

                            {/* Misc. */}
                            <section>
                                <p className="text-2xl font-semibold text-gray-800">Caution Fee</p>
                                <p className="font-medium text-lg">
                                    Amount: <span className="text-gray-500">NGN {apartment.cautionFee.toLocaleString()} / booking</span>
                                </p>
                                <p className="font-medium text-lg">
                                    Payment method:
                                    <span className="text-gray-500"> Both Card and Bank Transfer. Refund processed within 24 hrs after checkout.</span>
                                </p>
                            </section>

                            {/* Location */}
                            <section>
                                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Location</h3>
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                                    Google Map coming soon
                                </div>
                            </section>

                            {/* Reviews */}
                            <ReviewList reviews={apartment.reviews} />
                        </div>

                        {/* ------------------------- Right – Booking Card ------------------------- */}
                        <aside className="w-full md:w-1/4 border-2 rounded-lg p-4 bg-white sticky top-4 self-start">
                            <p className="text-2xl font-bold">
                                NGN {apartment.price.toLocaleString()} <span className="text-sm font-medium text-gray-500">per night</span>
                            </p>

                            <form className="mt-3 flex flex-col gap-4">
                                <div className="border-2 rounded-lg overflow-hidden divide-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-x-2">
                                        <div className="p-2">
                                            <label className="block text-gray-400 mb-1">Check‑in</label>
                                            <input
                                                type="date"
                                                value={checkIn}
                                                min={today}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <label className="block text-gray-400 mb-1">Check‑out</label>
                                            <input
                                                type="date"
                                                value={checkOut}
                                                min={checkIn || today}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <label className="block text-gray-500 mb-1">Guests</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max={apartment.maxGuests}
                                            defaultValue="1"
                                            className="w-full border-2 border-gray-300 rounded-lg p-2"

                                        />
                                    </div>
                                </div>

                                <button type="button" className="w-full bg-blue-500 rounded-md p-3 text-white hover:bg-blue-600">
                                    Reserve
                                </button>
                            </form>

                            <p className="text-gray-400 my-4 text-sm text-justify">This listing is available for reservations up to 30 days in advance.</p>
                            <div className="flex gap-2 flex-col">
                                <div className="flex justify-between">
                                    <p className="text-gray-500 text-lg md:text-xs">{`NGN ${apartment.price.toLocaleString()} X ${nights} night(s)`}</p>
                                    <p className="text-lg md:text-xs">{`NGN ${price.toLocaleString()}`}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-500 text-lg md:text-xs">Caution Fee</p>
                                    <p className="text-lg md:text-xs">{`NGN ${cautionFee.toLocaleString()}`}</p>
                                </div>
                                <div className="flex justify-between border-t-2 pt-2 border-gray-200">
                                    <p className="text-gray-500 text-xl md:text-base">Total Price</p>
                                    <p className="text-xl md:text-sm font-bold">{`NGN ${totalPrice.toLocaleString()}`}</p>
                                </div>
                            </div>
                        </aside>
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
