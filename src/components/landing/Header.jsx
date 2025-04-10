import {Link, useLocation} from 'react-router-dom';
import {FaHome} from "react-icons/fa";

const Header = () => {
    const location = useLocation();
    const current = location.pathname;

    const isActive = (path) =>
        current === path ? 'text-blue-700 font-bold' : 'hover:text-blue-500 active:text-orange-400';

    return (
        <header className="flex sticky top-0 bg-white justify-between px-10 py-7 uppercase">
            <Link to="/" className="text-2xl font-extrabold text-blue-500 flex items-center gap-2">
                <FaHome />3ird-shortlet
            </Link>
            <div className="flex gap-3 items-center font-medium">
                <Link to="/pricing" className={isActive("/pricing")} title="See our pricing plans">Pricing</Link>
                <Link to="/blogs" className={isActive("/blogs")} title="checkout our blogs channel">Blogs</Link>
                <Link to="/contact" className={isActive("/contact")} title="For further support">Contact</Link>
                <Link to="/login" className="py-2 px-6 bg-blue-500 hover:text-blue-500 hover:bg-white text-white border border-blue-500 rounded-md tracking-wide">Login</Link>
            </div>
        </header>
    );
};

export default Header;
