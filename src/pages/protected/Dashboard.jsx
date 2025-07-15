import React, { useState, useEffect } from "react";
import { FaSwimmingPool } from "react-icons/fa";
import {MdBeachAccess, MdApartment, MdBusinessCenter } from "react-icons/md";
import { BiSolidHot } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import apartmentService from "../../services/apartmentService.js";
import SearchBar from "./SearchBar.jsx";
import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Spinner from "../../components/Spinner.jsx";
import {Link} from "react-router-dom";
import ApartmentCard from "../../components/ApartmentCard.jsx";
import {toast, ToastContainer} from "react-toastify";

const Dashboard = () => {
    // State management
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Categories definition    "email": "Werner_Huel28@yahoo.com",

    const categories = [
        {
            id: 'featured',
            name: 'Featured',
            icon: <BiSolidHot className="text-2xl" />,
            color: 'from-orange-500 to-pink-500'
        },
        {
            id: 'beachfront',
            name: 'Beachfront',
            icon: <MdBeachAccess className="text-2xl" />,
            color: 'from-blue-400 to-cyan-300'
        },
        {
            id: 'cityview',
            name: 'City View',
            icon: <GiModernCity className="text-2xl" />,
            color: 'from-purple-500 to-indigo-500'
        },
        {
            id: 'luxury',
            name: 'Luxury',
            icon: <MdApartment className="text-2xl" />,
            color: 'from-yellow-500 to-amber-500'
        },
        {
            id: 'pool',
            name: 'With Pool',
            icon: <FaSwimmingPool className="text-2xl" />,
            color: 'from-cyan-500 to-blue-500'
        },
        {
            id: 'business',
            name: 'Business',
            icon: <MdBusinessCenter className="text-2xl" />,
            color: 'from-gray-600 to-gray-700'
        }
    ];

    // Fetch apartments data
    const fetchApartments = async () => {
        try {
            setLoading(true);
            const { data } = await apartmentService.getApartments('/user/dashboard');
            setApartments(data);
        } catch (err) {
            toast.error(err.message || 'Failed to fetch apartments');
            console.error('Error fetching apartments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApartments();
    }, []);

    if (loading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-6 px-4">
            <ToastContainer />
            {/* Hero Section */}
            <div className="relative h-[600px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2")',
                        filter: 'brightness(0.7)',
                        borderRadius: '20px'
                    }}
                />
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-center animate-pulse delay-1000">
                        Find Your Perfect Stay
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-8 text-center max-w-2xl animate-bounce delay-200">
                        Discover amazing properties for your next adventure
                    </p>

                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>

            <section className="w-full my-5">
                <h2 className="text-lg md:text-2xl font-bold text-blue-500 mb-3">Explore by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`relative group hover:scale-105 active:scale-95 overflow-hidden rounded-xl aspect-video cursor-pointer transition-all duration-200
                                ${activeCategory === category.id ? 'ring-2 ring-blue-500' : ''}
                            `}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} 
                                opacity-90 group-hover:opacity-100 transition-opacity duration-200`}
                            />
                            <div className="relative h-full flex flex-col items-center justify-center p-4">
                                {category.icon}
                                <span className="mt-2 text-white font-medium">
                                    {category.name}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/*Luxury listings*/}
            { apartments?.luxuryListing.length &&
                <section id="listings" className="w-full my-5 text-blue-500">
                    <div className="flex justify-between flex-wrap items-center mb-2">
                        <h2 className="text-lg md:text-2xl font-bold text-blue-500">Luxury Listings</h2>
                        <Link to='#' className="hover:underline">View more</Link>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {apartments?.luxuryListing.map((luxury, index) => (
                            <ApartmentCard key={index} props={luxury} />))}
                    </div>
                </section>
            }
            {/*popular listings*/}
            {apartments?.popularListings.length &&
            <section className="w-full my-5 text-blue-500">
                <div className="flex justify-between flex-wrap items-center mb-2">
                    <h2 className="text-lg md:text-2xl font-bold text-blue-500">Popular Listings</h2>
                    <Link to='#' className="hover:underline">View more</Link>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {apartments?.popularListings.map((popular, index) => (
                        <ApartmentCard key={index} props={popular} />))
                    }
                </div>
            </section>
            }

            {/*Special offers*/}
            {
                apartments?.specialOffers.length  &&
                <section className="w-full my-5 text-blue-500">
                    <div className="flex justify-between flex-wrap items-center mb-2">
                        <h2 className="text-lg md:text-2xl font-bold text-blue-500">Special Offer</h2>
                        <Link to='#' className="hover:underline">View more</Link>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {apartments?.specialOffers.map((specialOffer, index) => (
                            <ApartmentCard key={index} props={specialOffer} />))
                        }
                    </div>
                </section>
            }

            {/*rare listings*/}
            {
                apartments?.rareListings &&
                <section className="w-full my-5 text-blue-500">
                        <div className="flex justify-between flex-wrap items-center mb-2">
                            <h2 className="text-lg md:text-2xl font-bold text-blue-500">Rare Listings</h2>
                            <Link to='#' className="hover:underline">View more</Link>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {apartments.rareListings.map((specialOffer, index) => (
                                <ApartmentCard key={index} props={specialOffer} />))
                            }
                        </div>
                    </section>
            }
        </div>
    );
};

export default Dashboard;
