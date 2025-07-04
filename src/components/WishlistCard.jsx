import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import wishlistService from "../services/wishlistService.js";
import {toast, ToastContainer} from "react-toastify";


function IconBtn({ children, label, onClick, danger }) {
    return (
        <button
            aria-label={label}
            onClick={onClick}
            className={`rounded-full p-1.5 backdrop-blur-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${danger
                ? "text-red-600 hover:bg-red-600/15"
                : "text-white hover:bg-white/15"}`}
        >
            {children}
        </button>
    );
}

const removeApartment = async (id) => {
    try {
        await wishlistService.deleteAnApartment(id)
        toast.success('Apartment removed from wishlist successfully');
        window.location.reload();
    }catch (e){
        toast.error(e.message || 'An error occurred. Please try again.');
    }
}

const WishlistCard = ({ wishlist }) => {
    const navigate = useNavigate();
    const { id, name, price, address, images } = wishlist;

    return (
        <div
            className="relative aspect-[6/5] overflow-hidden rounded-2xl shadow transition ring-0 hover:scale-[1.015] hover:ring-2 hover:ring-primary/60"
        >
            <ToastContainer />
            {/* cover image */}
            <img
                src={images[0]}
                alt={name}
                className="absolute inset-0 h-full w-full object-cover"
            />
                console.error("Booking failed:", result.message);

            {/* dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* bottom‑left title */}
            <div className="absolute bottom-0 left-0 z-10 p-4 flex gap-1 flex-col text-white">
                <h3 className="text-base font-medium leading-none">{name}</h3>
                <h4 className="text-sm font-medium leading-none">{`${address.city}, ${address.country}`}</h4>
                <p className="text-xs opacity-90">{`NGN ${price.toLocaleString()}`}</p>
            </div>

            {/* top‑right actions */}
            <div className="absolute top-0 right-0 z-10 flex gap-1 p-2">
                <IconBtn label="View" onClick={() => navigate(`/apartment/${id}`)}>
                    <Eye className="h-4 w-4" />
                </IconBtn>
                <IconBtn
                    label="Delete"
                    onClick={() => removeApartment(id)}
                    danger
                >
                    <Trash2 className="h-4 w-4" />
                </IconBtn>
            </div>
        </div>
    );
}

export default WishlistCard
