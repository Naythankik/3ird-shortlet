import {Link, useLocation, useNavigate} from 'react-router-dom'
import {
    FaBell,
    FaBuilding,
    FaCalendarCheck,
    FaEnvelope,
    FaHeart,
    FaHome, FaPowerOff
} from "react-icons/fa";
import authService from "../../services/authService.js";
import {FaUser} from "react-icons/fa6";
import {useEffect, useState} from "react";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    const menus = [
        { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
        { name: 'Apartments', path: '/apartments', icon: <FaBuilding /> },
        { name: 'Bookings', path: '/bookings', icon: <FaCalendarCheck /> },
        { name: 'Wishlists', path: '/wishlists', icon: <FaHeart /> },
        { name: 'Messages', path: '/message', icon: <FaEnvelope /> },
        { name: 'Notifications', path: '/notifications', icon: <FaBell /> },
        { name: 'Profile', path: '/profile', icon: <FaUser /> },
        // { name: 'Promotions', path: '/promotions', icon: <FaTags /> },
        // { name: 'Users', path: '/users', icon: <FaUsers /> },
        // { name: 'Roles & Permissions', path: '/roles', icon: <FaUserShield /> },
        // { name: 'Settings', path: '/settings', icon: <FaCog /> },
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await authService.getUserProfile();
                setProfile(user.profile);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProfile();
    }, []);

    return (
        <aside className="min-w-20 md:w-48 h-screen relative">
            <nav role="navigation" aria-label="sidebar navigation" className="fixed left-0 bg-blue-500 p-2 md:p-4 text-white h-full">
                <ul className="space-y-4">
                    {menus.map((menu, index) => (
                        <li key={index}>
                            <Link
                                to={menu.path}
                                title={menu.name}
                                className={`flex gap-2 items-center px-4 py-2 w-fit md:w-auto rounded hover:bg-blue-600 ${
                                    location.pathname.includes(menu.name.toLowerCase().slice(0, -1)) ? 'md:bg-blue-700' : ''
                                }`}
                            >
                                <span
                                    className={`text-2xl md:text-base ${location.pathname === menu.path ? 'text-blue-700 md:text-white' : ''}`}>{menu?.icon}</span>
                                <span className="hidden md:inline-block">{menu.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="absolute bottom-0 w-full left-0 p-3">
                    <div className="bg-white rounded-xl h-auto flex flex-col md:flex-row items-center justify-between p-3 gap-2">
                        <img src={profile.profilePicture || 'https://i.pravatar.cc/100?img=1'} alt={profile.firstName} className="w-6 h-6 md:w-10 md:h-10 rounded-full" />
                        {/*<----------------------Add more options here for users settings-------------------->*/}
                        <button
                            onClick={() => {
                                authService.logout()
                                navigate('/login')
                            }}
                            aria-label="Logout"
                            className="text-red-400 text-xl block md:flex items-center gap-1">
                            <FaPowerOff />
                            <span className="hidden md:inline-block">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
