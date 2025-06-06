// src/components/Dashboard/Dashboard.jsx
import { useState, useEffect } from "react";
import { FaSwimmingPool } from "react-icons/fa";
import { MdBeachAccess, MdApartment, MdBusinessCenter } from "react-icons/md";
import { BiSolidHot } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import apartmentService from "../../services/apartmentService.js";
import spinner from "../Spinner.jsx";
import SearchBar from "./SearchBar.jsx";
import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';


const Dashboard = () => {
    // State management
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Categories definition
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
            const { apartments: data } = await apartmentService.getApartments(
                `/apartments/read?page=1&limit=20&category` // =${activeCategory}`
            );
            setApartments(data);
        } catch (err) {
            console.error('Error fetching apartments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApartments();
    }, [activeCategory]);

    if (loading) {
        return spinner.apartmentSpinner();
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-6">
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

             {/*Categories */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-8">
                    Explore by Category
                </h2>
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
            </div>

        </div>
    );
};

export default Dashboard;
