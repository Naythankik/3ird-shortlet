import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {Link} from "react-router-dom";

function PricingPage() {
    const plans = [
        {
            name: "Standard",
            price: "₦30,000 / night",
            features: [
                "1 Bedroom Apartment",
                "Free Wi-Fi",
                "24/7 Security",
                "Self Check-in",
                "TV & Streaming Access"
            ],
            bg: "bg-white"
        },
        {
            name: "Deluxe",
            price: "₦45,000 / night",
            features: [
                "2 Bedroom Apartment",
                "All Standard features",
                "Fully Equipped Kitchen",
                "City View Balcony",
                "Dedicated Work Space"
            ],
            bg: "bg-blue-50"
        },
        {
            name: "Premium",
            price: "₦70,000 / night",
            features: [
                "3 Bedroom Luxury Apartment",
                "All Deluxe features",
                "Private Pool Access",
                "Gym & Sauna",
                "Daily Housekeeping"
            ],
            bg: "bg-yellow-50"
        }
    ];

    return (
        <>
            <Header />
            <main className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Pricing Plans</h1>
                    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                        Choose a plan that suits your travel needs. Whether it’s a quick getaway or an extended stay, we’ve got you covered.
                    </p>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {plans.map((plan, idx) => (
                            <div key={idx} className={`rounded-xl shadow-lg p-6 ${plan.bg}`}>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{plan.name}</h2>
                                <p className="text-xl text-blue-600 font-bold mb-4">{plan.price}</p>
                                <ul className="text-left text-gray-600 space-y-2 mb-6">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="mr-2 text-green-500 font-bold">✓</span>{feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/login" className="grid w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                                    Book Now
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default PricingPage;
