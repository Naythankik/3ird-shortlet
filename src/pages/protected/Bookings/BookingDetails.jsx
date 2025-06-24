import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import bookingService from "../../../services/bookingService.js";
import Spinner from "../../../components/Spinner.jsx";

const BookingDetails = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            const { booking } = await bookingService.getBooking(bookingId);
            console.log(booking)
            setBooking(booking)
        };

        fetchBooking();
    }, [bookingId]);

    if (!booking) return <Spinner />;

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 text-blue-500">
            <h1 className="text-3xl font-bold mb-4">Booking Details</h1>

            {/* Apartment Images */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {booking.apartment.images.map((img, index) => (
                    <img key={index} src={img} alt={`Apartment Image ${index + 1}`} className="rounded-lg h-48 object-cover w-full" />
                ))}
            </div>

            {/* Apartment Info */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
                <h2 className="text-xl font-semibold">{booking.apartment.name}</h2>
                <p className="text-gray-600">{booking.apartment.description.slice(0, 300)}...</p>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 shadow-sm border rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Booking ID</p>
                        <p className="text-xs sm:text-base font-medium">{booking.id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Guests</p>
                        <p className="font-medium">{booking.guests.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Check-In</p>
                        <p className="font-medium">{formatDate(booking.checkInDate)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Check-Out</p>
                        <p className="font-medium">{formatDate(booking.checkOutDate)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="font-medium text-blue-600">$ {booking.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <p className={`font-medium capitalize ${booking.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}`}>
                            {booking.paymentStatus}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Booking Status</p>
                        <p className={`font-medium capitalize ${booking.bookingStatus === "completed" ? "text-green-600" : "text-yellow-600"}`}>
                            {booking.bookingStatus}
                        </p>
                    </div>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                    <div>
                        <p className="text-sm text-gray-500 mt-4">Special Requests</p>
                        <p className="text-gray-700">{booking.specialRequests.slice(0, 300)}...</p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-4">
                <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Back</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Download Invoice</button>
            </div>
        </div>
    );
};

export default BookingDetails;
