import {Link, useLocation} from 'react-router-dom';
import {FaHome, FaInfo} from "react-icons/fa";
import {useState} from "react";
import HamburgerMenu from "../../assets/icons/hamburger.png";
import CloseMenu from "../../assets/icons/close.png";

const Header = () => {
    const location = useLocation();
    const current = location.pathname;

    const routes = [
        {
            path: '/about',
            name: 'About',
            description: 'To know more about how we handle shortlet on our platfomr'
        },
        {
            path: '/blogs',
            name: 'Blogs',
            description: 'Checkout our blogs channel'
        },
        {
            path: '/contact',
            name: 'Contact',
            description: 'For further support on renting an apartment'
        },
        {
            path: '/pricing',
            name: 'Pricing',
            description: 'See our pricing plans'
        },
        {
            path: '/services',
            name: 'Services',
            description: 'For our services on our platform'
        },
        {
            path: '/login',
            name: 'Login',
            description: 'Login to see our resources'
        }
        ]

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path) =>
        current === path ? 'text-blue-700 font-bold' : 'hover:text-blue-500 active:text-orange-400';

    return (
        <header className="flex sticky top-0 bg-white justify-between px-10 py-7 uppercase">
            <Link to="/" className="text-base md:text-2xl font-extrabold text-blue-500 flex items-center gap-2">
                <FaHome />3ird-shortlet
            </Link>
            <div className="hidden md:flex gap-3 items-center font-medium">
                { routes.map((route, index) => (
                    <Link key={index} to={route.path} className={
                        route.path !== '/login' ? isActive(route.path) :
                        'py-2 px-6 bg-blue-500 hover:text-blue-500 hover:bg-white text-white border border-blue-500 rounded-md tracking-wide'
                    } title={route.title}>{route.name}</Link>
                )) }
            </div>
            <div className="flex md:hidden" onClick={toggleMenu}>
                <img src={isOpen ? CloseMenu : HamburgerMenu} className="w-6" alt="hamburger-menu" />
            </div>
            <nav className={`md:hidden flex-col gap-6 font-medium absolute rounded-lg top-16 right-7 min-w-2/5 bg-blue-100 px-8 py-5 transition-all duration-300 ease-in-out ${isOpen ? "flex" : "hidden"}`}>
                { routes.map((route, index) => (
                    <Link
                        key={index}
                        to={route.path}
                        className={`${route.path !== '/login' ? `${isActive(route.path)} text-blue-500 hover:underline flex gap-4 items-center` :
                        'py-2 px-4 text-center bg-blue-500 hover:text-blue-500 hover:bg-white text-white border border-blue-500 rounded-md tracking-wide'}
                        `}
                        title={route.title}
                    >
                        <FaInfo className={`${route.path !== '/login' ? 'inline-block' : 'hidden'}`} />
                        {route.name}
                    </Link>
                )) }
            </nav>
        </header>
    );
};

export default Header;
