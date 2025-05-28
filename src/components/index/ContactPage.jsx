
const ContactPage = () => {
    return (
        <>
            <main className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">Contact Us</h1>

                    <div className="grid gap-10 md:grid-cols-2">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                            <p className="text-gray-600 mb-6">
                                We'd love to hear from you. Reach out to us for bookings, partnerships, or general inquiries.
                            </p>
                            <ul className="space-y-4 text-gray-700">
                                <li><strong>Email:</strong> contact@3irdshortlet.com</li>
                                <li><strong>Phone:</strong> +234 800 123 4567</li>
                                <li><strong>Instagram:</strong> @3irdshortlet</li>
                                <li><strong>Office:</strong> 23 Elegushi Street, Lekki Phase 1, Lagos</li>
                            </ul>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <form className="space-y-6">
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Message</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg p-2 h-32 resize-none focus:outline-none focus:ring focus:border-blue-400"
                                        placeholder="Write your message here..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Optional Map Placeholder */}
                    <div className="mt-16">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Location</h3>
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                            {/* You can embed Google Maps iframe here */}
                            Google Map Coming Soon
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ContactPage;
