import { Link, useLocation } from 'react-router-dom'
import {
    FaBell,
    FaBuilding,
    FaCalendarCheck, FaCog,
    FaEnvelope,
    FaHeart,
    FaHome,
    FaTags,
    FaUsers,
    FaUserShield
} from "react-icons/fa";

const Sidebar = () => {
    const location = useLocation();

    const menus = [
        { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
        { name: 'Apartments', path: '/apartments', icon: <FaBuilding /> },
        { name: 'Bookings', path: '/bookings', icon: <FaCalendarCheck /> },
        { name: 'Wishlists', path: '/wishlists', icon: <FaHeart /> },
        { name: 'Messages', path: '/messages', icon: <FaEnvelope /> },
        { name: 'Notifications', path: '/notifications', icon: <FaBell /> },
        { name: 'Promotions', path: '/promotions', icon: <FaTags /> },
        { name: 'Users', path: '/users', icon: <FaUsers /> },
        { name: 'Roles & Permissions', path: '/roles', icon: <FaUserShield /> },
        { name: 'Settings', path: '/settings', icon: <FaCog /> },
    ];


    return (
        <aside className="min-w-24 md:w-64 h-screen relative">
            <nav className="fixed left-0 bg-blue-500 p-2 md:p-4 text-white h-full z-50">
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
            </nav>
        </aside>
    );
};

export default Sidebar;
