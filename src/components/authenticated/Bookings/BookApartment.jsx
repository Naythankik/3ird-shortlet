import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import bookingService from "../../../services/bookingService.js";
import authService from "../../../services/authService.js";
import paymentService from "../../../services/paymentService.js";
import { loadStripe } from "@stripe/stripe-js";
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
    const [errors, setErrors] = useState({});
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
        if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (validateForm()) {
            const url = `bookings/create/${params.apartmentId}`;

            try{
                const response = await bookingService.createBooking(url, {
                    checkInDate: formData.checkIn,
                    checkOutDate: formData.checkOut,
                    guests: formData.guests,
                    specialRequests: formData.requests || null,
                });

                if(response.status === 201){
                    const paymentResponse = await paymentService.createCheckoutSession(response.booking.id,{
                        amount: response.booking.totalPrice,
                        "currency": formData.currency,
                        "description": formData.paymentDescription,
                        "method": formData.paymentMethod
                    });

                    const stripe = await stripePromise;
                    const result = await stripe.redirectToCheckout({
                        sessionId: paymentResponse.id,
                    });

                    if (result.error) {
                        setError(result.error.message);
                    }
                }
            }catch (error){
                setError(error.message || 'An error occurred. Please try again.')
            }finally {
                setErrors({})
                setLoading(false)
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }


    return (
        <div className="max-w-2xl mx-auto p-6 text-blue-600">
            <h1 className="text-3xl font-bold mb-6">Book an Apartment</h1>
            { error && <p className="text-red-500 text-sm my-5">{error}</p> }

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
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Check-in Date</label>
                        <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onFocus={() => {setErrors((prevState) => ({...prevState, checkIn: null}))}}
                            onChange={handleChange}
                            className="w-full p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                        />
                        {errors.checkIn && <p className="text-red-500 text-sm">{errors.checkIn}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Check-out Date</label>
                        <input
                            type="date"
                            name="checkOut"
                            onFocus={() => {setErrors((prevState) => ({...prevState, checkOut: null}))}}
                            value={formData.checkOut}
                            onChange={handleChange}
                            className="w-full p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                        />
                        {errors.checkOut && <p className="text-red-500 text-sm">{errors.checkOut}</p>}
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
                    {errors.guests && <p className="text-red-500 text-sm">{errors.guests}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Payment Description</label>
                    <input
                        type="text"
                        name="paymentDescription"
                        value={formData.paymentDescription}
                        onChange={handleChange}
                        className="w-full p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                        placeholder="e.g., Booking for 3 nights"
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
                        onFocus={() => {setErrors((prevState) => ({...prevState, requests: null}))}}
                        rows="6"
                        className="w-full resize-none p-2 border-2 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                    ></textarea>
                    {errors.requests && <p className="text-red-500 text-sm">{errors.requests}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookApartment;
