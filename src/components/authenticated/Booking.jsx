import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService.js";
import spinner from "../Spinner.jsx";
import {Link} from "react-router-dom";

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const tableHeaders = [
        'ID',
        'Apartment',
        'Booking Status',
        'Payment Status',
        'Price',
        'Check In',
        'Check Out',
    ];

    const getStatusColor = (status) => {
        let color;
        switch (status) {
            case 'cancelled':
            case 'failed':
                color = 'text-red-500';
                break;
            case 'completed':
            case 'paid':
                color = 'text-green-500';
                break;
            case 'booked':
            case 'pending':
                color = 'text-orange-500';
                break;
            default:
                color = 'text-slate-500';
                break;
        }
        return color;
    }

    const getBookings = async () => {
        try {
            setLoading(true);
            const { booking } = await bookingService.getBookings('/bookings/read');
            setBookings(booking);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getABooking = async (name, id) => {

        try {
            const { booking } = await bookingService.getBooking(id);
            console.log(booking)
            setSelectedBooking(booking);
            setShowModal(true);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            getBookings();
    }, []);

    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : 'unset';
    }, [showModal]);

    const getDate = (value) => {
        return new Date(value).toLocaleDateString(); // Optional: makes date readable
    };

    if(loading){
        return spinner.tableSpinner()
    }

    return (
        <div className="mt-16 bg-transparent">

            {showModal && selectedBooking && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-lg w-full md:max-w-2xl p-6 relative">
                        <button
                            className="absolute top-3 right-4 text-red-500 text-lg"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>

                        <h2 className="text-xl font-semibold text-blue-500 mb-4">
                            Booking Details
                        </h2>

                        <div className="space-y-2 text-slate-700">
                            <p><strong>Apartment:</strong> {selectedBooking.apartment?.name}</p>
                            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
                                <p><strong>Total Price:</strong> ₦{Number(selectedBooking.totalPrice).toLocaleString()}
                                </p>
                                <p className="flex gap-4"><strong>Location:</strong>
                                    <Link
                                        rel="noopener noreferrer"
                                        to={`https://www.google.com/maps?q=${selectedBooking.apartment?.location.lat},${selectedBooking.apartment?.location.lng}`}
                                        target='_blank'
                                    >
                                        {selectedBooking.apartment?.location.lat +' '+ selectedBooking.apartment?.location.lng}
                                    </Link>
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">

                                <p><strong>Booking Status:</strong> <span
                                    className={`${getStatusColor(selectedBooking.bookingStatus)} capitalize`}>{selectedBooking.bookingStatus}</span>
                                </p>
                                <p><strong>Payment Status:</strong> <span
                                    className={`${getStatusColor(selectedBooking.paymentStatus)} capitalize`}>{selectedBooking.paymentStatus}</span>
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
                                <p><strong>Check In:</strong> {getDate(selectedBooking.checkInDate)}</p>
                                <p><strong>Check Out:</strong> {getDate(selectedBooking.checkOutDate)}</p>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">

                                <p><strong>Guests:</strong> {selectedBooking.guests}</p>
                                <p><strong>Initiated on:</strong> {getDate(selectedBooking.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <table className="table-auto border-collapse border border-slate-500 w-full">
                <caption className="caption-top text-lg font-semibold text-blue-500 mb-2">
                    All Apartment Bookings Overview
                </caption>
                <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th scope="col" className="border border-slate-600 text-blue-500 p-2" key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {bookings.length === 0 ? (
                    <tr>
                        <td colSpan={tableHeaders.length} className="text-center p-4 text-slate-500">
                            No bookings available.
                        </td>
                    </tr>
                ) : (
                    bookings.map((booking, index) => (
                        <tr key={index}
                            onClick={() => getABooking(booking.apartment.name, booking.id)}
                            className="hover:bg-slate-200 transition-all cursor-pointer">
                            <td className="border border-slate-700 text-slate-700 p-2 text-center">{index + 1}</td>
                            <td className="truncate max-w-[200px] border border-slate-700 text-slate-700 p-2">{booking.apartment?.name}</td>
                            <td className={`border border-slate-700 p-2 text-left md:text-center capitalize ${getStatusColor(booking.bookingStatus)}`}>{booking.bookingStatus}</td>
                            <td className={`border border-slate-700 p-2 text-left md:text-center capitalize ${getStatusColor(booking.paymentStatus)}`}>{booking.paymentStatus}</td>
                            <td className="border border-slate-700 text-slate-700 text-left md:text-center p-2">₦{Number(booking.totalPrice).toLocaleString()}</td>
                            <td className="border border-slate-700 text-slate-700 text-left md:text-center p-2">{getDate(booking.checkInDate)}</td>
                            <td className="border border-slate-700 text-slate-700 text-left md:text-center p-2">{getDate(booking.checkOutDate)}</td>
                        </tr>
                    ))
                    )}

                </tbody>
            </table>

        </div>
    );
};

export default Booking;
