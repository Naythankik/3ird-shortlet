import Dashboard from "../pages/protected/Dashboard.jsx";
import Apartment from "../pages/protected/Apartments/Apartment.jsx";
import Wishlist from "../pages/protected/Wishlists/Wishlist.jsx";
import ApartmentDetails from "../pages/protected/Apartments/ApartmentDetails.jsx";
import BookApartment from "../pages/protected/Bookings/BookApartment.jsx";
import AuthGuard from "../components/guards/AuthGuard.jsx";
import Booking from "../pages/protected/Bookings/Booking.jsx";
import BookingDetails from "../pages/protected/Bookings/BookingDetails.jsx";
import Payment from "../pages/protected/Bookings/Payment.jsx";
import Message from "../pages/protected/Message.jsx";

const ProtectedRoutes =
    [
        {
            path: '/dashboard',
            element: <AuthGuard element={<Dashboard />} isAuthRequired={true} />
        },
        {
            path: '/apartments',
            element: <AuthGuard element={<Apartment />} isAuthRequired={true} />
        },
        {
            path: '/bookings',
            element: <AuthGuard element={<Booking />} isAuthRequired={true} />
        },
        {
            path: '/bookings/:bookingId',
            element: <AuthGuard element={<BookingDetails />} isAuthRequired={true} />
        },
        {
            path: '/wishlists',
            element: <AuthGuard element={<Wishlist />} isAuthRequired={true} />
        },
        {
            path: '/apartment/:apartmentId',
            element: <AuthGuard element={<ApartmentDetails />} isAuthRequired={true} />
        },
        {
            path: '/booking/:apartmentId/payment/:bookingId',
            element: <AuthGuard element={<Payment />} isAuthRequired={true} />
        },
        {
            path: '/apartment/:apartmentId/book/:name',
            element: <AuthGuard element={<BookApartment/>} isAuthRequired={true}/>
        },
        {
            path: 'message',
            element: <AuthGuard element={<Message />} isAuthRequired={true} />
        }
    ]
export default ProtectedRoutes;
