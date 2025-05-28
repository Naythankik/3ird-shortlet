import { BedDouble, MapPin, Wifi, ShieldCheck, CalendarCheck2 } from "lucide-react";

const services = [
    {
        title: "Fully Furnished Apartments",
        icon: <BedDouble className="w-8 h-8 text-blue-600" />,
        description: "All our units come with modern furnishings and home comforts to make your stay seamless."
    },
    {
        title: "Prime Locations",
        icon: <MapPin className="w-8 h-8 text-blue-600" />,
        description: "Enjoy convenient access to top neighborhoods in Lagos, Abuja, and more."
    },
    {
        title: "High-Speed Internet",
        icon: <Wifi className="w-8 h-8 text-blue-600" />,
        description: "Stay connected with reliable, fast WiFi in every apartment."
    },
    {
        title: "24/7 Security & Support",
        icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
        description: "Round-the-clock security and a dedicated support team for your peace of mind."
    },
    {
        title: "Flexible Booking",
        icon: <CalendarCheck2 className="w-8 h-8 text-blue-600" />,
        description: "Book short or long-term stays, with flexible check-in and check-out options."
    }
];

const ServicePages = () => {
    return (
        <>
            <main className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-blue-700 mb-4">Our Services</h1>
                    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                        At <span className="font-semibold text-blue-600">3ird Shortlet</span>, we’re committed to providing top-notch short-term rentals that feel just like home — but better. Here’s what we offer.
                    </p>

                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-left">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                                <div className="mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default ServicePages;
