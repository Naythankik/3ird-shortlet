import Amenities from "../../data/amenities.jsx";

const AmenitySection = () =>  {
    return (
        <section
            className="flex flex-col items-center justify-between px-6 md:px-20 py-6 md:py-16 gap-4 md:gap-10">
            <h2 className="w-full md:w-2/5 text-center text-wrap text-lg md:text-2xl font-bold leading-tight text-blue-800 uppercase">
                Our The Top Notch Amenities you get when you book today
            </h2>
            <div className="flex flex-wrap justify-evenly gap-6 md:px-6 py-4">
                {Amenities.map((amenity, index) => (
                    <article
                        key={index}
                        className="bg-transparent shadow-lg py-5 flex flex-wrap gap-6 text-center justify-center rounded-lg w-full md:w-96">
                        <div className="mb-4">{amenity.icon}</div>
                        <div className="px-5 py-3 md:py-8 flex flex-col gap-2">
                            <p title={amenity.title} className="text-blue-500 font-bold text-base md:text-xl text-wrap capitalize">{amenity.title}</p>
                            <p title={amenity.description} className="text-gray-400 text-sm md:text-base">{amenity.description}</p>
                        </div>
                    </article>                ))}

            </div>

        </section>
    )
    }

export default AmenitySection;
