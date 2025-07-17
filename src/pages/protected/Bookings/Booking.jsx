import {useEffect, useState} from "react";
import bookingService from "../../../services/bookingService.js";
import Spinner from "../../../components/Spinner.jsx";
import NoDataComponent from "../../../components/helpers/NoDataComponent.jsx";
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const Booking = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false);

    const getBookings = async () => {
        try {
            setLoading(true);
            const { booking } = await bookingService.getBookings('/bookings/read');
            setBookings(booking);
        } catch (err) {
            toast.error(err.message)
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookings();
        document.title = '3ird Shortlet | Bookings';
    }, [])

    const statusTag = (value) => {
        let bgColor;

        switch (value) {
            case 'completed':
                bgColor = 'bg-green-50'
                break;
            case 'booked' :
                bgColor= 'bg-green-200'
                break
            case 'cancelled':
                bgColor = 'bg-red-200'
                break
            default:
                bgColor= 'bg-gray-200'
                break
        }
        return <p className={`capitalize px-3 py-1 rounded-3xl ${bgColor}`}>{value}</p>
    }

    if(loading){
        return <Spinner />
    }

    return <div className="flex flex-col gap-4 mt-5">
        <ToastContainer />
        {bookings.length > 0 ?
            bookings.map((booking, i) => (
            <article key={i} className="border-2 border-gray-300 p-3 rounded-xl grid md:grid-cols-[4fr_1fr] justify-between">
                <div className="flex gap-5">
                    <div className="relative">
                        <div className="rounded-xl absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <img src={booking?.apartment?.images[0]} alt={booking?.apartment?.name} className="rounded-xl w-[200px] h-[180px] object-cover" />
                    </div>
                    <div className="flex justify-between flex-col pt-4 w-full md:w-3/5">
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold text-slate-700 text-lg">{booking?.apartment?.name}</p>
                            <p className="font-medium text-slate-700 text-base">{`${booking?.apartment?.address?.city}, ${booking?.apartment?.address?.country}`}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            <button
                                onClick={() => navigate(`/bookings/${booking.id}`, {state: {booking: booking}})}
                                className="bg-blue-500 p-2 hover:opacity-90 text-white text-lg font-semibold rounded-lg">View Details</button>
                            {booking.bookingStatus === 'confirmed' ?
                                <button className="bg-transparent border-2 border-gray-300 p-2 text-blue-600 text-lg font-semibold rounded-lg">Rebook</button>
                            :
                                <>
                                    <Link
                                        to={`/booking/${booking.apartment.id}/payment/${booking.id}`}
                                        className="text-center bg-transparent border-2 border-gray-300 p-2 text-blue-600 text-lg font-semibold rounded-lg">
                                        Complete Booking
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex flex-col gap-1 items-end text-gray-600 font-medium text-base">
                    <p>{new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(booking.createdAt))}</p>
                    {statusTag(booking.bookingStatus)}
                </div>
            </article>
        )) :
            <NoDataComponent title="No bookings available" description="You have not made any bookings yet." />
        }
    </div>
}

export default Booking;
