import ApartmentImage from "../../assets/apartment.webp";

const AboutPage = () => {
    return (
        <>
            <main className="bg-gray-50 text-gray-800">
                {/* Hero Section */}
                <section className="bg-blue-100 py-16 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">Welcome to 3ird Shortlet</h1>
                    <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
                        Your comfort is our priority. Experience premium short-term stays that feel like home — all across Nigeria.
                    </p>
                </section>

                {/* Who We Are */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto grid gap-10 sm:grid-cols-2 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
                            <p className="text-gray-600">
                                At <span className="font-semibold text-blue-500">3ird Shortlet</span>, we’re more than just accommodation —
                                we’re your reliable partner for luxury, convenience, and affordability. Since our launch, we’ve hosted
                                hundreds of happy guests in premium locations across Lagos, Abuja, and Port Harcourt.
                            </p>
                        </div>
                        <img
                            src={ApartmentImage}
                            alt="Shortlet apartment"
                            className="rounded-2xl shadow-lg w-full"
                        />
                    </div>
                </section>

                {/* What We Offer */}
                <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold mb-6">What We Offer</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Modern Spaces</h3>
                                <p className="text-gray-600">All our apartments are tastefully furnished with a modern aesthetic.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Prime Locations</h3>
                                <p className="text-gray-600">Stay close to business hubs, nightlife, or serene environments.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                                <p className="text-gray-600">Need anything? We’re just a call or chat away anytime, day or night.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Flexible Booking</h3>
                                <p className="text-gray-600">Book for a day, a week, or even months — you’re in control.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Pocket-Friendly Rates</h3>
                                <p className="text-gray-600">Luxury doesn’t have to break the bank. Enjoy top-tier living on a budget.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Clean & Secure</h3>
                                <p className="text-gray-600">Your health and safety are guaranteed with our hygiene-first approach.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold mb-10">What Our Guests Say</h2>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow">
                                <p className="italic text-gray-600">"I stayed for 5 nights and didn’t want to leave. Everything was clean, peaceful, and beautifully designed."</p>
                                <h4 className="font-semibold mt-4 text-blue-600">— Chioma, Lagos</h4>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow">
                                <p className="italic text-gray-600">"Perfect for remote work and vacation. Fast Wi-Fi, comfy beds, and great customer service!"</p>
                                <h4 className="font-semibold mt-4 text-blue-600">— Tunde, Abuja</h4>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-blue-600 py-16 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Book Your Stay?</h2>
                    <p className="text-lg mb-6">Browse our apartments and book the one that fits your vibe.</p>
                    <a
                        href="/apartments"
                        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
                    >
                        Explore Apartments
                    </a>
                </section>
            </main>
        </>
    );
};

export default AboutPage;
