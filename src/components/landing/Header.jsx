import {Link, useLocation} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import {useState} from "react";
import HamburgerMenu from "../../assets/icons/hamburger.png";
import CloseMenu from "../../assets/icons/close.png";

const Header = () => {
    const location = useLocation();
    const current = location.pathname;

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path) =>
        current === path ? 'text-blue-700 font-bold' : 'hover:text-blue-500 active:text-orange-400';

    return (
        <header className="flex sticky top-0 bg-white justify-between px-10 py-7 uppercase">
            <Link to="/" className="text-xl md:text-2xl font-extrabold text-blue-500 flex items-center gap-2">
                <FaHome />3ird-shortlet
            </Link>
            <div className="hidden md:flex gap-3 items-center font-medium">
                <Link to="/pricing" className={isActive("/pricing")} title="See our pricing plans">Pricing</Link>
                <Link to="/blogs" className={isActive("/blogs")} title="checkout our blogs channel">Blogs</Link>
                <Link to="/contact" className={isActive("/contact")} title="For further support">Contact</Link>
                <Link to="/login" className="py-2 px-6 bg-blue-500 hover:text-blue-500 hover:bg-white text-white border border-blue-500 rounded-md tracking-wide">Login</Link>
            </div>
            <div className="flex md:hidden" onClick={toggleMenu}>
                <img src={isOpen ? CloseMenu : HamburgerMenu} className="w-6" alt="hamburger-menu" />
            </div>
            <nav className={`md:hidden flex-col gap-6 font-medium absolute rounded-lg top-16 right-7 w-1/4 bg-white px-8 py-5 transition-all duration-300 ease-in-out ${isOpen ? "flex" : "hidden"}`}>
                <Link className="py-2 md:py-0" to="/">Home </Link>
                <Link className="py-2 md:py-0" to="#">About </Link>
                <Link className="py-2 md:py-0" to="#">Service </Link>
                <Link className="py-2 md:py-0" to="contact">Contact </Link>
            </nav>
        </header>
    );
};

export default Header;
