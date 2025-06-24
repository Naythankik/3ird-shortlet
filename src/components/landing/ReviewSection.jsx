import Reviews from "../../data/reviews.jsx";

const ReviewSection = () => {
    return (
        <section className="flex flex-col items-center justify-between px-6 md:px-20 py-6 md:py-16 gap-4 md:gap-10">
            <h2 className="w-full md:w-2/5 text-center text-wrap text-lg md:text-2xl font-bold leading-tight text-blue-800 uppercase">
                Reviews from our guests
            </h2>
            <div className="w-full flex flex-nowrap overflow-x-scroll justify-evenly gap-6 md:px-6 py-4" style={{scrollbarWidth: 'none'}}>
                {Reviews.map((review, index) => (
                    <article key={index} className="p-4 border rounded-lg shadow-sm min-w-72 md:min-w-96">
                        <h3 className="text-base md:text-xl font-semibold text-blue-500">{review.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm md:text-base text-gray-500">{review.apartment}</span>
                            <span className="text-sm md:text-base text-yellow-500">{review.rating} ★</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">{review.date}</p>
                        <i className="text-xs md:text-sm text-gray-700 mt-4 flex">"{review.comment}"</i>
                    </article>
                ))}

            </div>

        </section>
    );
}

export default ReviewSection;
