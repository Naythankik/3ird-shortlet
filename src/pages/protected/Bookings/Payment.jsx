import {FaCcMastercard, FaCcVisa, FaPaypal, FaPlusCircle} from "react-icons/fa";
import {useEffect, useState} from "react";
import CardsComponent from "../../../components/CardsComponent.jsx";
import bookingService from "../../../services/bookingService.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import paymentService from "../../../services/paymentService.js";

const Payment = () => {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);
    const [booking, setBooking] = useState(null);
    const { bookingId } = useParams();
    const [loading, setLoading] = useState(false);
    const queryParams = new URLSearchParams(location.search);

    const getDate = (value) => {
        const date = new Date(value)
        const formattedDate = date.toDateString().split(" ")
        return formattedDate[2] + ", " + formattedDate[0] + " " + formattedDate[1] + ", " + formattedDate[3]
    }

    const cardOptions = [
        {
            id: 1,
            icon: FaPaypal,
            name: 'paypal',
            number: '**** **** **** 1234',
            expiry: '06/2025',
            color: 'blue',
            cvv: '***'
        },
        {
            id: 2,
            icon: FaCcMastercard,
            name: 'mastercard',
            number: '**** **** **** 1234',
            expiry: '06/2025',
            color: 'red',
            cvv: '***'
        },
        {
            id: 3,
            icon: FaCcVisa,
            name: 'visa',
            number: '**** **** **** 1234',
            expiry: '06/2025',
            color: 'blue',
            cvv: '***'
        }
    ]

    const getDateDifference = (firstDay, lastDay) => {
        const diff = new Date(lastDay) - new Date(firstDay);
        const aDay = 86400 * 1000
        return (diff / aDay)
    }

    const confirmBooking = async (e) => {
        e.preventDefault()
        setLoading(true)
        const payload = {
            description: 'Booking for ' + booking?.apartment?.name,
            currency: 'usd',
            method: 'card'
        }
        try{
            const response = await paymentService.createCheckoutSession(bookingId, payload)
            if(response.status === 400){
                toast.error(response.message);
                return
            }
            navigate(response.data.url)
        }catch (e){
            toast.error(e.message);
            return
        }finally {
            setLoading(false)
        }
    }

    useEffect( () => {
        const booking = async () => {
            try{
                const { booking, status } = await bookingService.getBooking(bookingId)
                if(status === 404) return navigate('/bookings')
                setBooking(booking)
            }catch (e){
                toast.error(e.message);
            }
        }
        booking()

    }, []);

    /* React to Stripe checkout callbacks */
    useEffect(() => {
        if (queryParams.has("success")) {
            toast.success("Payment has been verified – check your email for details.");
        }
        if (queryParams.has("cancel")) {
            toast.error("Payment was cancelled. Please try again.");
            navigate(location.pathname, { replace: true });
        }
    }, [queryParams, navigate, location.pathname]);

    useEffect(() => {
        booking?.paymentStatus === 'processed' && toast.info('Payment is processing. Please wait for confirmation.')
    }, [booking])

    return (
        <div>
            <ToastContainer />
            <form onSubmit={confirmBooking} className="flex flex-col-reverse md:flex-row mt-4 gap-5 items-center">
                <div className="flex w-full md:w-3/5 flex-col gap-3">
                    <div className="hidden md:grid">
                        <h2 className="font-black text-gray-800 mb-3 text-xl">Payment Method</h2>
                        <div className="flex flex-col gap-3 px-3 py-4 rounded-lg border-2 bg-white">
                            <h3 className="font-bold text-lg text-gray-800">Saved card</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {cardOptions.map( (card) =>
                                    <CardsComponent
                                        key={card.id}
                                        card={card}
                                        selectedCard={selectedCard}
                                        onCheck={setSelectedCard} />
                                )}

                                <button className="md:border md:p-2 rounded-lg flex gap-3 items-center font-semibold cursor-pointer text-blue-500">
                                    <FaPlusCircle />
                                    Add New Payment
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-5 rounded-lg border bg-white">
                        <div className="grid grid-cols-1 border-b border-gray-200 pb-6 mb-4">
                                <h3 className="text-gray-900 font-bold">Cancellation policy</h3>
                                <h4 className="text-gray-900 font-bold">Free cancellation before Nov 30.</h4>
                                <p>
                                    <span className="text-gray-500 text-sm font-medium">After that, the reservation is non-refundable. </span>
                                    <Link to="#" className="underline font-bold">Learn more</Link>
                                </p>
                            </div>
                        <div className="grid grid-cols-1 gap-3">
                            <h3 className="text-gray-900 font-bold">Ground rules</h3>
                            <p className="w-full md:w-3/4 text-sm text-gray-500 font-medium">
                                We ask every guest to remember a few simple things about what makes a great guest
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-500 font-medium ml-3">
                                {booking?.apartment.rules.map((rule, i) =>
                                    <li key={i}>{rule}</li>
                                )}
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="flex w-full md:w-2/5 flex-col gap-2 p-5 rounded-lg border h-fit">
                    <div className="relative rounded-md h-[200px]">
                        <div className="h-full">
                            <div className="rounded-xl absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent"></div>
                            <img src={booking?.apartment?.images[0]} alt={booking?.apartment?.name} className="rounded-md w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-3 left-3 grid gap-0 text-white">
                            <p className="font-semibold text-base">{`Place to stay | ${booking?.apartment?.name}`}</p>
                            <span className="text-xs">{`${booking?.apartment?.address?.city}, ${booking?.apartment?.address?.country}`}</span>
                            <ul className="flex list-inside">
                                {[...Array(3)].map((_, index) => (
                                    <div className="flex" key={index}>
                                        <li className="text-xs flex items-end font-medium capitalize">
                                            <p>{booking?.apartment?.features[index]}</p>
                                        </li>
                                        {index !== 2 && <span className="mx-2">.</span>}
                                    </div>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex md:hidden flex-col gap-3 px-3 py-4 rounded-lg border-2 bg-white">
                        <h3 className="font-bold text-lg text-gray-800">Saved card</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {cardOptions.map( (card) =>
                                <CardsComponent
                                    key={card.id}
                                    card={card}
                                    selectedCard={selectedCard}
                                    onCheck={setSelectedCard} />
                            )}

                            <button className="md:border md:p-2 rounded-lg flex gap-3 items-center font-semibold cursor-pointer text-blue-500">
                                <FaPlusCircle />
                                Add New Payment
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1">
                        <h4 className="text-gray-600 font-bold text-sm mb-2">Your Booking Summary</h4>
                        <div className="grid grid-cols-1 gap-1 text-sm">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Check-in</p>
                                <p className="text-gray-600 font-semibold">{getDate(booking?.checkInDate)}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Check-Out</p>
                                <p className="text-gray-600 font-semibold">{getDate(booking?.checkOutDate)}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Guests</p>
                                <p className="text-gray-600 font-semibold">{booking?.guests}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <h4 className="text-gray-600 font-bold text-sm mb-2">Pricing Breakdown</h4>
                        <div className="grid grid-cols-1 gap-1 text-sm">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">
                                    {`$ ${booking?.apartment?.price.toLocaleString()} X ${getDateDifference(booking?.checkInDate, booking?.checkOutDate)} night`}
                                </p>
                                <p className="text-gray-600 font-semibold">{`$ ${(booking?.apartment?.price * getDateDifference(booking?.checkInDate, booking?.checkOutDate)).toLocaleString()}`}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Caution Fee</p>
                                <p className="text-gray-600 font-semibold">{`$ ${booking?.apartment?.cautionFee.toLocaleString()}`}</p>
                            </div>
                            <p className="text-xs text-gray-400 mt-5">NB: In some cases, discount available for the selected date has been added to the purchase price.</p>
                            <div className="flex justify-between items-center pt-2 border-t-2 border-gray-200">
                                <p className="text-gray-600">Total</p>
                                <p className="text-gray-600 font-bold text-lg">{`$ 
                                ${booking?.totalPrice.toLocaleString()}`}
                                </p>
                            </div>

                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading || booking?.bookingStatus === 'confirmed'}
                        className={`bg-blue-500 text-white rounded-md p-3 flex justify-center items-center gap-5`}
                    >{`Confirm & pay $
                    ${booking?.totalPrice.toLocaleString()}`}
                        { loading && <div className="w-4 h-4 rounded-full border-r-2 border-l-2 animate-spin"></div>}
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Payment;
