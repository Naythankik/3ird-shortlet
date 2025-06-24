import { Link } from "react-router-dom";
import DummyApartment from "../../assets/apartment.webp";

const HeroSection = () => {
    return (
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-6 md:py-16 gap-4 md:gap-10">
            <div className="md:w-1/2 text-left space-y-6 md:space-y-8">
                <h1 className="text-xl md:text-5xl font-bold leading-tight text-blue-800 uppercase">
                    Premium shortlet apartments in Nigeria at pocket-friendly rates
                </h1>
                <p className="text-gray-700 text-base md:text-xl">
                    Discover stylish, fully-furnished shortlet spaces perfect for business trips,
                    vacations, or weekend getaways available in top Nigerian cities at rates you’ll love.
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
    );
}

export default HeroSection
