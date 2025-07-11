import React, {useEffect, useState} from "react";
import bookingService from "../services/bookingService.js";
import {toast} from "react-toastify";
import Spinner from "./Spinner.jsx";

const BookingCard = ({apartment}) => {
    const today = new Date().toISOString().split('T')[0];

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [nights, setNights] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)
    const [price, setPrice] = useState(0)
    const [cautionFee, setCautionFee] = useState(0)
    const [specialRequest, setSpecialRequest] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleBooking = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const payload = JSON.stringify({
            guests,
            checkInDate: checkIn,
            checkOutDate:checkOut,
            specialRequests: specialRequest
        });
        try{
            const result = await bookingService.createBooking(`bookings/create/${apartment.id}`, payload);

            if (result.error) {
                toast.error(result.message);
            } else {
                const { message, status } = result
                status === 500 ? toast.warn(message, {}) : toast.success(message, {})
            }
        }catch (e) {
            toast.error(e.message)
        }finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setCautionFee(apartment.cautionFee)
        setPrice(apartment.price)
        setTotalPrice(
            (Number(apartment.price) + Number(apartment.cautionFee)).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        );
    })

    useEffect(() => {
        if (checkIn && checkOut) {
            const inDate = new Date(checkIn);
            const outDate = new Date(checkOut);
            const diffInMs = outDate - inDate; // Difference in milliseconds
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            setNights(diffInDays);
            setPrice(diffInDays * apartment.price);
            setTotalPrice((Number(diffInDays * apartment.price) + Number(apartment.cautionFee)).
                toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            );
        }
    }, [checkOut, checkIn, cautionFee, price]);

    if(isLoading) return <Spinner />

    return <aside className="w-full md:w-1/4 border-2 rounded-lg p-4 bg-white sticky top-4 self-start">
        <p className="text-xl font-bold">
            NGN {apartment.price.toLocaleString()} <span className="text-xs font-medium text-gray-500">per night</span>
        </p>

        <form className="mt-3 flex flex-col gap-4" onSubmit={handleBooking}>
            <div className="border-2 rounded-lg overflow-hidden divide-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2">
                    <div className="p-2">
                        <label className="block text-gray-400 mb-1">Check‑in <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            value={checkIn}
                            min={today}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>
                    <div className="p-2">
                        <label className="block text-gray-400 mb-1">Check‑out <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            value={checkOut}
                            min={checkIn || today}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>
                </div>
                <div className="p-2">
                    <label className="block text-gray-500 mb-1">Guests <span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        min="1"
                        max={apartment.maxGuests}
                        onChange={(e) => setGuests(e.target.value)}
                        defaultValue={guests}
                        className="w-full border-2 border-gray-300 rounded-lg p-2"
                        required

                    />
                </div>
                <div className="p-2">
                    <label className="block text-gray-500 mb-1">Any special request?</label>
                    <textarea
                        className="w-full border-2 border-gray-300 rounded-lg p-2 resize-none"
                        onChange={(e) => setSpecialRequest(e.target.value)}
                        rows="4"
                    ></textarea>
                </div>

            </div>

            <button type="submit" className="w-full bg-blue-500 rounded-md p-3 text-white hover:bg-blue-600">
                Reserve
            </button>
        </form>

        <p className="text-gray-400 my-4 text-sm text-justify">This listing is available for reservations up to 30 days in advance.</p>
        <div className="flex gap-2 flex-col">
            <div className="flex justify-between">
                <p className="text-gray-500 text-lg md:text-xs">{`NGN ${price.toLocaleString()} X ${nights} night(s)`}</p>
                <p className="text-lg md:text-xs">{`NGN ${price.toLocaleString()}`}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-500 text-lg md:text-xs">Caution Fee</p>
                <p className="text-lg md:text-xs">{`NGN ${cautionFee.toLocaleString()}`}</p>
            </div>
            <div className="flex justify-between border-t-2 pt-2 border-gray-200">
                <p className="text-gray-500 text-xl md:text-base">Total Price</p>
                <p className="text-xl md:text-sm font-bold">{`NGN ${totalPrice.toLocaleString()}`}</p>
            </div>
        </div>
    </aside>

}

export default BookingCard;
