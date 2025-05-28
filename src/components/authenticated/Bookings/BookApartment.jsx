import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import bookingService from "../../../services/bookingService.js";
import authService from "../../../services/authService.js";

const BookApartment = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1,
        requests: ''
    });

    const [errors, setErrors] = useState({});

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
        if (validateForm()) {
            const url = `bookings/create/${params.apartmentId}`
            try{
                const response = await bookingService.createBooking(url, {
                    checkInDate: formData.checkIn,
                    checkOutDate: formData.checkOut,
                    guests: formData.guests,
                    specialRequests: formData.requests || null,
                });
                console.log(response)
            }catch (error){
                setErrors( {general: error.message[0] || 'An error occurred. Please try again.' });
                console.log(error, errors)
            }finally {
                setErrors({})
            }
            return
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 text-blue-600">
            <h1 className="text-3xl font-bold mb-6">Book an Apartment</h1>
            {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

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
