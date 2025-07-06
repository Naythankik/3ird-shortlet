import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import bookingService from "../../../services/bookingService.js";
import Spinner from "../../../components/Spinner.jsx";
import {toast, ToastContainer} from "react-toastify";
import { jsPDF } from "jspdf";

const BookingDetails = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);

    const downloadInvoice = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(40, 40, 40);
        doc.text("3ird Shortlet - Booking Invoice", 20, 25);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);

        // Booking Info
        doc.text(`Booking ID: ${booking.id}`, 20, 45);
        doc.text(`Apartment: ${booking.apartment.name.slice(0, 40)}`, 20, 55);
        doc.text(`Check In: ${formatDate(booking.checkInDate)}`, 20, 65);
        doc.text(`Check Out: ${formatDate(booking.checkOutDate)}`, 20, 75);
        doc.text(`Guests: ${booking.guests.toLocaleString()}`, 20, 85);

        const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency", currency: "USD"
        }).format(booking.totalPrice);

        doc.text(`Total Price: ${formattedPrice}`, 20, 95);
        doc.text(`Payment Status: ${booking.paymentStatus.toUpperCase()}`, 20, 105);
        doc.text(`Booking Status: ${booking.bookingStatus.toUpperCase()}`, 20, 115);

        // Special Requests
        if (booking.specialRequests) {
            doc.text("Special Requests:", 20, 130);
            doc.setFontSize(10);
            const requests = doc.splitTextToSize(booking.specialRequests.slice(0, 300), 170);
            doc.text(requests, 20, 140);
        }

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(120);
        doc.text("Thank you for booking with 3ird Shortlet!", 20, 280);
        doc.text("Visit us: www.3irdshortlet.ng", 20, 287);

        // Save as PDF
        doc.save(`invoice_${booking.apartment.name}_3ird-shortlet_${booking.apartment.id}.pdf`);
    };

    const fetchBooking = async () => {
        setLoading(true);

        try {
            const { booking, error } = await bookingService.getBooking(bookingId);

            if (error?.status === 422) {
                const message = error.response?.data?.message || "Unauthorized access to booking.";
                toast.error(message);
                return;
            }

            if (booking) {
                setBooking(booking);
            } else {
                toast.error("Booking not found.");
            }

        } catch (e) {
            // Catch any unexpected error (network, internal server, etc.)
            const message = e.response?.data?.message || e.message || "Something went wrong";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

    useEffect(() => {
        fetchBooking();
    }, [bookingId]);

    if (loading) return <Spinner />;

    return (
        <div className="max-w-5xl mx-auto px-2 md:px-6 py-3 md:py-10 text-blue-500">
            <ToastContainer />

            {/* Apartment Images */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {booking?.apartment?.images.filter((_, i) => {
                    return i < 5
                }).map((img, ind) => (
                    <img key={ind} src={img} alt={`Apartment Image ${ind + 1}`} className="rounded-lg h-48 object-cover w-full" />
                ))}
                <div className="h-48 rounded-lg bg-gray-300 flex justify-center items-center">
                    <p className="text-gray-700">See more</p>
                </div>
            </div>

            {/* Apartment Info */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
                <h2 className="text-xl font-semibold">{booking?.apartment?.name}</h2>
                <p className="text-gray-600">{booking?.apartment?.description.slice(0, 300)}...</p>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 shadow-sm border rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Booking ID</p>
                        <p className="text-xs sm:text-base font-medium">{booking?.id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Guests</p>
                        <p className="font-medium">{booking?.guests.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Check-In</p>
                        <p className="font-medium">{formatDate(booking?.checkInDate)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Check-Out</p>
                        <p className="font-medium">{formatDate(booking?.checkOutDate)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="font-medium text-blue-600">$ {booking?.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <p className={`font-medium capitalize ${booking?.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}`}>
                            {booking?.paymentStatus}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Booking Status</p>
                        <p className={`font-medium capitalize ${booking?.bookingStatus === "completed" ? "text-green-600" : "text-yellow-600"}`}>
                            {booking?.bookingStatus}
                        </p>
                    </div>
                </div>

                {/* Special Requests */}
                {booking?.specialRequests && (
                    <div>
                        <p className="text-sm text-gray-500 mt-4">Special Requests</p>
                        <p className="text-gray-700">{booking?.specialRequests.slice(0, 300)}...</p>
                    </div>
                )}
            </div>
             <button onClick={downloadInvoice} className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Download Invoice</button>
        </div>
    );
};

export default BookingDetails;
