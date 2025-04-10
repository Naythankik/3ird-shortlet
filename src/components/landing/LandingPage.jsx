import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import DummyApartment from "../../assets/apartment.webp";
import StudioApartment from "../../assets/Studio_apartment.webp";
import ArticleApartment from "../../assets/article.jpg";
import WifiIcon from "../../assets/icons/wifi.png";
import AC from "../../assets/icons/ac.png";
import Swimmer from "../../assets/icons/swimmer.png";
import TV from "../../assets/icons/tv.png";
import CockTail from "../../assets/icons/cocktail.png"
import Parking from "../../assets/icons/parking.png"
import DumbBell from "../../assets/icons/dumbbell.png"
import FAQ from "../../assets/faq.webp";
import {useState} from "react";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";

function DateInput() {
    const [date, setDate] = useState("2025-04-10");
    return (
        <input
            className="p-2 rounded-xl w-full focus:outline-none"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
    );
}

const amenities = [
    {
        image: WifiIcon,
        title: 'Superfast Wi-Fi speed',
        description: 'Enjoy blazing fast internet with no interruptions. Our high-speed Wi-Fi network ensures that you can stream videos, video call, work remotely, and stay connected with ease, whether you’re in your room or relaxing in the lounge.'
    },
    {
        image:  AC,
        title: 'Air Conditioning',
        description: 'Stay cool and comfortable in all rooms. Our air conditioning units are designed to provide the perfect indoor temperature, allowing you to unwind after a long day of exploring or working. You can adjust the settings for ultimate comfort.'
    },
    {
        image: Swimmer,
        title: 'Swimming Pool',
        description: 'Relax and unwind in the beautiful outdoor pool. Our pool is perfect for a refreshing dip on a hot day, or for lounging by the water with a cold drink. Whether you\'re swimming laps or just soaking up the sun, it’s an experience you’ll cherish.'
    },
    {
        image: DumbBell,
        title: 'Gym Facilities',
        description: 'Access a fully equipped gym during your stay. Our state-of-the-art gym includes a range of cardio machines, free weights, and resistance equipment, ensuring you can keep up with your fitness routine, no matter how long your stay is.'
    },
    {
        image: Parking,
        title: 'Free Parking',
        description: 'Secure and free parking available for guests. We offer plenty of parking space, so you never have to worry about finding a spot. Whether you’re traveling by car or with friends, our parking facilities are safe and convenient.'
    },
    {
        image: CockTail,
        title: 'Fully Equipped Kitchen',
        description: 'Cook your favorite meals with top-of-the-line appliances. Our kitchens are equipped with modern stoves, microwaves, refrigerators, and all the utensils you’ll need to prepare a delicious home-cooked meal. It’s perfect for guests who want to enjoy a meal in privacy or host a gathering.'
    },
    {
        image: TV,
        title: 'Flat Screen TV',
        description: 'Enjoy your favorite shows and movies on a large TV. Each apartment comes with a flat-screen TV, offering access to various cable channels and streaming platforms, so you can unwind and entertain yourself with ease. Ideal for movie nights or catching up on the latest shows.'
    }
];

const apartmentList = [
    {
        title: "Luxury Apartment in Lagos",
        description: "A spacious 3-bedroom apartment with stunning city views. Perfect for business travelers and families looking for a comfortable stay.",
        image: ArticleApartment,
        price: "75,000"
    },
    {
        title: "Cozy Studio in Victoria Island",
        description: "A modern studio apartment located in the heart of Victoria Island. Ideal for solo travelers or couples seeking a cozy retreat.",
        image: ArticleApartment,
        price: "60,000"
    },
    {
        title: "Seafront Apartment in Lekki",
        description: "Enjoy breathtaking views of the ocean in this well-appointed 2-bedroom seafront apartment. A tranquil escape near the beach.",
        image: ArticleApartment,
        price: "100,000"
    },
    {
        title: "Executive Apartment in Ikeja",
        description: "This executive 2-bedroom apartment offers the perfect balance of luxury and convenience for business executives and vacationers.",
        image: ArticleApartment,
        price: "85,000"
    },
    {
        title: "Spacious 4-Bedroom Apartment in Banana Island",
        description: "A luxurious 4-bedroom apartment with world-class amenities and expansive space, perfect for larger groups or families.",
        image: ArticleApartment,
        price: "150,000"
    },
    {
        title: "Contemporary Apartment in Lekki Phase 1",
        description: "This sleek 2-bedroom apartment offers a contemporary design and is ideal for those who prefer modern living in a prime location.",
        image: ArticleApartment,
        price: "95,000"
    },
    {
        title: "Stylish 1-Bedroom Apartment in Surulere",
        description: "A charming 1-bedroom apartment in the vibrant Surulere district, with easy access to shopping, dining, and entertainment.",
        image: ArticleApartment,
        price: "50,000"
    },
    {
        title: "Penthouse Suite in Ikoyi",
        description: "Experience the epitome of luxury living in this penthouse suite, featuring panoramic views and state-of-the-art amenities.",
        image: ArticleApartment,
        price: "200,000"
    }
];

const reviewList = [
    { name: "John Doe", rating: 5, date: "2025-04-10", apartment: "Premium Suite", comment: "Amazing stay, would recommend!" },
    { name: "Jane Smith", rating: 4, date: "2025-03-28", apartment: "Standard Room", comment: "Great location and clean, but a bit noisy." },
    { name: "Samuel Lee", rating: 3, date: "2025-02-15", apartment: "Deluxe Suite", comment: "Good service, but the amenities could be improved." },
    { name: "Emily Johnson", rating: 5, date: "2025-01-05", apartment: "Executive Suite", comment: "Perfect experience, the staff were excellent!" },
    { name: "Michael Brown", rating: 2, date: "2024-12-20", apartment: "Luxury Villa", comment: "The place was nice, but the service was disappointing." },
    { name: "Sarah White", rating: 4, date: "2024-11-18", apartment: "Penthouse Suite", comment: "Great place, but the Wi-Fi was slow." },
    { name: "David Clark", rating: 3, date: "2024-10-30", apartment: "Standard Room", comment: "Decent stay, but it could have been cleaner." },
    { name: "Olivia Adams", rating: 5, date: "2024-09-12", apartment: "Premium Suite", comment: "Excellent! Very cozy and the view was stunning." },
    { name: "Liam Harris", rating: 4, date: "2024-08-09", apartment: "Studio Room", comment: "Comfortable, but could use better furniture." },
    { name: "Mia Martin", rating: 5, date: "2024-07-25", apartment: "Deluxe Suite", comment: "Had an amazing stay, the staff were very friendly." },
    { name: "Ethan Wilson", rating: 4, date: "2024-06-15", apartment: "Executive Suite", comment: "Very nice, but the room service was slow." },
    { name: "Charlotte Lee", rating: 5, date: "2024-05-03", apartment: "Penthouse Suite", comment: "Perfect location and luxurious experience!" },
    { name: "James Scott", rating: 2, date: "2024-04-18", apartment: "Luxury Villa", comment: "The place was fine, but it wasn’t as advertised." },
    { name: "Amelia Walker", rating: 4, date: "2024-03-21", apartment: "Standard Room", comment: "Comfortable and quiet, but had trouble with the air conditioning." },
    { name: "Benjamin Hall", rating: 3, date: "2024-02-10", apartment: "Executive Suite", comment: "Good location, but not enough facilities." },
    { name: "Ava Young", rating: 5, date: "2024-01-15", apartment: "Premium Suite", comment: "Absolutely loved the stay, worth every penny!" },
];

const FAQList = [
    {
        question: "What is a shortlet apartment?",
        answer: "A shortlet apartment is a fully furnished apartment available for rent on a short-term basis, typically for a few days to a few months."
    },
    {
        question: "How do I book a shortlet apartment?",
        answer: "You can book a shortlet apartment by visiting our website, selecting your desired apartment, and completing the booking process with your details and payment."
    },
    {
        question: "Are shortlet apartments fully furnished?",
        answer: "Yes, all of our shortlet apartments are fully furnished, including all the essential amenities such as Wi-Fi, a kitchen, and comfortable furniture."
    },
    {
        question: "Can I cancel my booking?",
        answer: "Yes, you can cancel your booking according to our cancellation policy. Be sure to check the specific terms before making a cancellation."
    },
    {
        question: "Do you offer discounts for long stays?",
        answer: "Yes, we offer discounts for longer stays. You can contact our customer service team to inquire about specific offers for extended bookings."
    }
]

const FAQArticle = ({question, answer}) => {
    const [seeAnswer, setSeeAnswer] = useState(false);
    return (
        <button className="w-full rounded-lg p-5 bg-white shadow" onClick={() => setSeeAnswer(!seeAnswer)}>
            <p className="flex items-center justify-between">
                {question}
            {!seeAnswer ? <FaCaretDown/> : <FaCaretUp/>}
            </p>
            <span className={`${seeAnswer ? 'inline-block' : 'hidden'} mt-4 text-left text-balance font-medium text-gray-500`}>
                {answer}
            </span>
        </button>
    )
}

const ArticleSection = ({title, description, price, image}) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <article className="bg-red-50 rounded-2xl min-w-96">
            <img src={image} alt="title" className="w-full rounded-t-2xl"/>
            <div className="px-5 py-8 flex flex-col gap-2">
                <p title={title} className="text-blue-500 font-bold text-xl capitalize truncate">
                    {title}
                </p>
                <p title={description} className="text-gray-400 text-base">
                    {showMore ? description : `${description.substring(0, 70)}...`}
                </p>
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-blue-500 text-sm mt-2 flex justify-start"
                >
                    {showMore ? 'Show Less' : 'Read More'}
                </button>
                <div className="flex gap-1 my-4">
                    <span title="price" className="text-blue-500 font-semibold">N{price}</span>
                    <span title="nights">/ Per Night</span>
                </div>
                <Link to=""
                      className="text-center py-3 px-6 bg-blue-500 hover:bg-white hover:text-blue-500 text-white border border-blue-500 rounded-lg font-semibold transition duration-300"
                >See details</Link>
            </div>
        </article>
    )
}

const ReviewSection = ({ name, rating, date, apartment, comment }) => {
    return (
        <article className="p-4 border rounded-lg shadow-sm bg-white min-w-96">
            <h3 className="text-xl font-semibold text-blue-500">{name}</h3>
            <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500">{apartment}</span>
                <span className="text-yellow-500">{rating} ★</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{date}</p>
            <i className="text-gray-700 mt-4 flex">"{comment}"</i>
        </article>
    );
}

const AmenitySection = ({props}) => {
    return (
        <article
            className="bg-transparent shadow-lg py-5 flex flex-wrap gap-6 text-center justify-center rounded-lg w-full md:w-96">
            <img src={props.image} alt={props.title} className="w-1/6 h-1/6 bg-none flex rounded-t-2xl"/>
            <div className="px-5 py-8 flex flex-col gap-2">
                <p title={props.title} className="text-blue-500 font-bold text-xl text-wrap capitalize">{props.title}</p>
                <p title={props.description} className="text-gray-400 text-base">{props.description}</p>
            </div>
        </article>
    )
}

const LandingPage = () => {
    return (
        <div>
            <Header/>

            <div className="bg-gradient-to-r from-blue-50 to-white">
                <section
                    className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-12 md:py-16 gap-8 md:gap-10">

                    <div className="md:w-1/2 text-center md:text-left space-y-6 md:space-y-8">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-blue-800 uppercase">
                            Premium shortlet apartments in Nigeria at pocket-friendly rates
                        </h1>
                        <p className="text-gray-700 text-lg md:text-xl">
                            Discover stylish, fully-furnished shortlet spaces perfect for business trips,
                            vacations, or weekend getaways — available in top Nigerian cities at rates you’ll love.
                        </p>
                        <Link
                            to="/login"
                            className="inline-block py-3 px-6 bg-blue-500 hover:bg-white hover:text-blue-500 text-white border border-blue-500 rounded-lg font-semibold transition duration-300"
                        >
                            Book an apartment
                        </Link>
                    </div>

                    <div className="md:w-1/2 w-full flex justify-center">
                        <img
                            src={DummyApartment}
                            alt="Apartment view"
                            title="One of our luxury apartments in Lagos"
                            className="rounded-2xl shadow-md w-full h-auto md:h-[400px] object-cover"
                        />
                    </div>
                </section>
                <section
                    className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 md:py-16 gap-8 md:gap-10">

                    <div className="md:w-1/2 w-full flex justify-center">
                        <img
                            src={StudioApartment}
                            alt="Apartment view"
                            title="One of our luxury apartments in Lagos"
                            className="rounded-2xl shadow-md w-full h-auto md:h-[400px] object-cover"
                        />
                    </div>

                    <div className="md:w-1/2 text-center md:text-left space-y-6 md:space-y-8">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-blue-800 uppercase">
                            Experience comfort and convenience in our premium shortlet apartments
                        </h1>
                        <p className="text-gray-700 text-lg md:text-xl">
                            Whether you’re traveling for business or leisure, our apartments offer the perfect
                            combination of comfort, style, and affordability. Located in prime Nigerian cities, each
                            space is designed for your ultimate convenience.
                        </p>
                        <form className="bg-blue-50 py-6 px-5 rounded-xl flex flex-col gap-3">
                            <div className="grid lg:grid-cols-3 gap-2">
                                <div className="flex flex-col gap-1">
                                    <label className="text-gray-700 text-base md:text-lg text-nowrap text-start">Check
                                        in</label>
                                    <DateInput/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-gray-700 text-base md:text-lg text-nowrap text-start">Check
                                        Out</label>
                                    <DateInput/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-gray-700 text-base md:text-lg text-nowrap text-start">Number
                                        of Rooms</label>
                                    <select className="p-3 bg-white rounded-xl focus:outline-none">
                                        <option selected disabled>Any</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>

                            </div>
                            <button
                                className="inline-block py-3 w-full bg-blue-500 hover:bg-white hover:text-blue-500 text-white border border-blue-500 rounded-lg font-semibold transition duration-300">
                                Check Availability
                            </button>
                        </form>
                    </div>
                </section>

                <section className="flex flex-col justify-between px-6 md:px-20 py-12 md:py-16 gap-8 md:gap-10">
                    <h2 className="text-center w-full text-xl md:text-2xl font-bold leading-tight text-blue-800 uppercase">Our
                        Rooms & Rates</h2>

                    <div className="flex flex-nowrap overflow-x-scroll justify-evenly gap-6 px-6 py-4"
                         style={{scrollbarWidth: 'none'}}>
                        {apartmentList.map((apartment, index) => (
                            <ArticleSection
                                key={index}
                                title={apartment.title}
                                description={apartment.description}
                                image={apartment.image}
                                price={apartment.price}
                            />
                        ))}
                    </div>

                </section>

                <section
                    className="flex flex-col items-center justify-between px-6 md:px-20 py-12 md:py-16 gap-8 md:gap-10">
                    <h2 className="w-3/4 md:w-2/5 text-center text-wrap text-xl md:text-2xl font-bold leading-tight text-blue-800 uppercase">
                        Our The Top Notch Amenities you get when you book today
                    </h2>
                    <div className="flex flex-wrap justify-evenly gap-6 px-6 py-4">
                        {amenities.map((amenity, index) => (
                            <AmenitySection props={amenity} key={index}/>
                        ))}

                    </div>

                </section>

                <section
                    className="flex flex-col items-center justify-between px-6 md:px-20 py-12 md:py-16 gap-8 md:gap-10">
                    <h2 className="w-3/4 md:w-2/5 text-center text-wrap text-xl md:text-2xl font-bold leading-tight text-blue-800 uppercase">
                        Reviews from our previous guests
                    </h2>

                    <div className="w-full flex flex-nowrap overflow-x-scroll justify-evenly gap-6 px-6 py-4"
                         style={{scrollbarWidth: 'none'}}>
                        {reviewList.map((review, index) => (
                            <ReviewSection
                                key={index}
                                name={review.name}
                                rating={review.rating}
                                apartment={review.apartment}
                                date={review.date}
                                comment={review.comment}
                            />
                        ))}
                    </div>

                </section>

                <section
                    className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 md:py-16 gap-8 md:gap-10">

                    <div className="md:w-1/2 text-center space-y-6 md:space-y-8">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-blue-800 uppercase">
                            Frequently Asked Questions
                        </h1>
                        <div className="flex flex-col gap-3">
                            {FAQList.map((faq, index) => (
                                <FAQArticle answer={faq.answer} key={index} question={faq.question} />
                            ))}
                        </div>
                    </div>

                    <div className="md:w-1/2 w-full flex justify-center">
                        <img
                            src={FAQ}
                            alt="Apartment view"
                            title="FAQ on our shortlets"
                            className="rounded-2xl shadow-md w-full h-auto md:h-[400px] object-cover"
                        />
                    </div>
                </section>
            </div>

            <Footer/>
        </div>
    );
};

export default LandingPage;
