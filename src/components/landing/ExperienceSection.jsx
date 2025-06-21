import DateInput from "../DateInput.jsx";
import StudioApartment from "../../assets/Studio_apartment.webp";

const ExperienceSection = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-6 md:py-16 gap-4 md:gap-10">
            <div className="md:w-1/2 w-full flex justify-center">
                <img
                    src={StudioApartment}
                    alt="Apartment view"
                    title="One of our luxury apartments in Lagos"
                    className="rounded-2xl shadow-md w-full h-auto md:h-[400px] object-cover"
                />
            </div>

            <div className="md:w-1/2 text-left space-y-6 md:space-y-8">
                <h1 className="text-xl md:text-5xl font-bold leading-tight text-blue-800 uppercase">
                    Experience comfort and convenience in our premium shortlet apartments
                </h1>
                <p className="text-gray-700 text-base md:text-xl">
                    Whether you’re traveling for business or leisure, our apartments offer the perfect
                    combination of comfort, style, and affordability. Located in prime Nigerian cities, each
                    space is designed for your ultimate convenience.
                </p>

                <form className="bg-blue-50 py-6 px-5 rounded-xl flex flex-col gap-3">
                    <div className="grid lg:grid-cols-3 gap-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 text-sm md:text-lg text-nowrap text-start">Check In</label>
                            <DateInput />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 text-sm md:text-lg text-nowrap text-start">Check Out</label>
                            <DateInput />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 text-sm md:text-lg text-nowrap text-start">Number of Rooms</label>
                            <select className="p-3 bg-white rounded-xl text-sm md:text-base focus:outline-none">
                                <option defaultChecked disabled>Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                    <button
                        className="inline-block py-3 w-full bg-blue-500 hover:bg-white hover:text-blue-500 text-white border border-blue-500 rounded-lg font-semibold transition duration-300"
                    >
                        Check Availability
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ExperienceSection
