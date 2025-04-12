import {Link} from 'react-router-dom';
import {FaFacebook, FaHome, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-blue-500 text-white px-10 pt-16 pb-40 uppercase">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr_1fr] items-start">

                <div className="flex items-center gap-2 justify-center md:justify-start text-2xl font-extrabold text-nowrap">
                    <FaHome/>
                    <span>3ird-shortlet</span>
                </div>

                <div className="flex flex-col gap-6 items-center md:flex-row md:justify-around">
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/blogs">Blogs</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <Link to="/about">About</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/terms">Terms</Link>
                    </div>
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/support">Support</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end gap-4 text-xl">
                    <Link to="#"><FaFacebook/></Link>
                    <Link to="#"><FaTwitter/></Link>
                    <Link to="#"><FaInstagram/></Link>
                    <Link to="#"><FaLinkedin/></Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
