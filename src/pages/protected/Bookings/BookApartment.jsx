import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import bookingService from "../../../services/bookingService.js";
import authService from "../../../services/authService.js";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "../../../components/Spinner.jsx";
import {toast, ToastContainer} from "react-toastify";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const BookApartment = () => {
    const params = useParams();

    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1,
        requests: '',
        currency: 'ngn',
        paymentDescription: '',
        paymentMethod: 'card',
    });

    const [loading, setLoading] = useState(false);
    const [activeState, setActiveState] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = `bookings/create/${params.apartmentId}`;

        try{
            const payload = {
                checkInDate: formData.checkIn,
                checkOutDate: formData.checkOut,
                guests: formData.guests,
                specialRequests: formData.requests || null,
                description: formData.paymentDescription || null,
                method: formData.paymentMethod,
                currency: formData.currency
            }

            const { error, data } = await bookingService.createBooking(url, payload);

            if (error) {
                if (error.status === 400) {
                    toast.error(error.message);
                } else {
                    console.log(error.message.length)
                    error.message.length
                        ? [...error.message].map(err => toast.error(err))
                        : toast.error(error.message[0]);
                }
                return
            }

            if(data.status === 201){
                const stripe = await stripePromise;
                const result = await stripe.redirectToCheckout({
                    sessionId: data.data.id,
                });
                if (result.error) {
                    toast.error(result.error.message);
                }
            }
        }catch (error){
            toast.error(error.message || 'An error occurred. Please try again.')
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const isAnyFieldFilled = Object.values(formData).some(val =>  val.length <= 0);
        setActiveState(isAnyFieldFilled);
    }, [formData]);


    if (loading) {
        return (
            <Spinner />
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 text-blue-600">
            <h1 className="text-3xl font-bold mb-6">Book an Apartment</h1>
            <ToastContainer />

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={authService.getUser()}
                        className="w-full p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                        disabled
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Check-in Date</label>
                        <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            className="w-full p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Check-out Date</label>
                        <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            className="w-full p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Number of Guests</label>
                    <input
                        type="number"
                        name="guests"
                        min="1"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Payment Description</label>
                    <input
                        type="text"
                        name="paymentDescription"
                        value={formData.paymentDescription}
                        onChange={handleChange}
                        className="w-full p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                        placeholder="e.g., OldBooking for 3 nights"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Currency</label>
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full p-2 border-2 bg-white focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                    >
                        <option disabled defaultChecked>Select currency</option>
                        <option value="usd">USD</option>
                        <option value="ngn">NGN</option>
                        <option value="eur">EUR</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Payment Method</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full p-2 border-2 bg-white focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                    >
                        <option disabled defaultChecked>Select payment method</option>
                        <option value="card">Card</option>
                        <option value="alipay">Alipay</option>
                        <option value="klarna">Klarna</option>
                        <option value="afterpay_clearpay">Afterpay Clearpay</option>
                        <option value="us_bank_account">US Bank Account</option>
                        <option value="sepa_debit">SEPA Debit</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Any Special Requests?</label>
                    <textarea
                        name="requests"
                        onChange={handleChange}
                        rows="6"
                        className="w-full resize-none p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                    ></textarea>
                </div>
                <button
                    disabled={formData.checkIn === '' || formData.checkOut === '' || formData.guests === '' || formData.paymentDescription === '' || formData.currency === '' || formData.paymentMethod === ''}
                    type="submit"
                    className={`w-full ${activeState ? 'opacity-25' : 'opacity-100' } bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors`}
                >
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookApartment;
