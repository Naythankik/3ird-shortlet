import ArticleSection from "./ArticleSection";
import ApartmentList from "./ApartmentList.jsx";

const RoomRatesSection = () => {
    return (
        <section className="flex flex-col justify-between px-6 md:px-20 py-6 md:py-16 gap-4 md:gap-10">
            <h2 className="text-center w-full text-lg md:text-2xl font-bold leading-tight text-blue-800 uppercase">
                Our Rooms & Rates
            </h2>

            <div className="flex flex-nowrap overflow-x-scroll justify-evenly gap-6 px-6 py-4"
                 style={{ scrollbarWidth: "none" }}>
                {ApartmentList.map((apartment, index) => (
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
    );
}


export default RoomRatesSection;
