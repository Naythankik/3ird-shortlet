import { useEffect, useState } from "react";
import bookingService from "../../../services/bookingService.js";
import { Link } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import NoDataComponent from "../../../components/helpers/NoDataComponent.jsx";
import Spinner from "../../../components/Spinner.jsx";
import {toast} from "react-toastify";

const OldBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedBy, setSortedBy] = useState(null);


    const tableHeaders = [
        { name: 'ID', hasArrow: false },
        { name: 'Apartment', hasArrow: true },
        { name: 'Booking Status', hasArrow: true },
        { name: 'Payment Status', hasArrow: true },
        { name: 'Price', hasArrow: true },
        { name: 'Check In', hasArrow: true },
        { name: 'Check Out', hasArrow: true }
    ];

    const sortByKey = (key) => {
        const newOrder = sortedBy === key && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        setSortedBy(key);

        const sortedBookings = bookings.sort((a, b) => {
            let comparison = 0;

            switch(key) {
                case 'Apartment':
                    comparison = a.apartment?.name.localeCompare(b.apartment?.name);
                    break;
                case 'Booking Status':
                    comparison = a.bookingStatus.localeCompare(b.bookingStatus);
                    break;
                case 'Payment Status':
                    comparison = a.paymentStatus.localeCompare(b.paymentStatus);
                    break;
                case 'Price':
                    comparison = Number(a.totalapplePrice) - Number(b.totalPrice);
                    break;
                case 'Check In':
                    comparison = new Date(a.checkInDate) - new Date(b.checkInDate);
                    break;
                case 'Check Out':
                    comparison = new Date(a.checkOutDate) - new Date(b.checkOutDate);
                    break;
                default:
                    return 0;
            }
            return newOrder === 'asc' ? comparison : -comparison;
        });
        setBookings(sortedBookings);
    };

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
            setSelectedBooking(booking);
            setShowModal(true);
        } catch (err) {
            toast.error(err.message)
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
        return new Date(value).toLocaleDateString();
    };

    if(loading){
        return (
            <Spinner />
        )
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
                            <div className="w-full h-96 rounded-lg overflow-hidden relative">
                                <img className="w-full h-full" src={selectedBooking.apartment?.images[0]} alt={selectedBooking.apartment?.name} />
                            </div>
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
            {bookings.length > 0 ?
                <table className="table-auto border-collapse border border-slate-500 w-full">
                    <caption className="caption-top text-lg font-semibold text-blue-500 mb-2">
                        All Apartment Bookings Overview
                    </caption>
                    <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th
                                scope="col"
                                className="border border-slate-600 text-blue-500 p-2 cursor-pointer"
                                key={index}
                            >
                                <div
                                    className="flex items-center gap-2"
                                    onClick={() => header.hasArrow && sortByKey(header.name)}
                                >
                                    {header.name}
                                    {header.hasArrow && (
                                        <ArrowUpDown
                                            className={`h-4 w-4 transition-transform ${
                                                sortedBy === header.name
                                                    ? sortOrder === 'asc'
                                                        ? 'text-blue-700'
                                                        : 'text-blue-700 rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    )}
                                </div>

                            </th>

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
                :
                <NoDataComponent title="No bookings available" description="You have not made any bookings yet." />
            }
        </div>
    );
};

export default OldBooking;
