import {useState} from "react";
import {Link} from "react-router-dom";

const ArticleSection = ({title, description, price, image}) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <article className="bg-red-50 rounded-2xl w-full md:min-w-96">
            <img src={image} alt="title" className="w-full rounded-t-2xl"/>
            <div className="px-5 py-8 flex flex-col gap-2">
                <p title={title} className="text-blue-500 font-bold text-base md:text-xl capitalize truncate">
                    {title}
                </p>
                <p title={description} className="text-gray-400 text-sm md:text-base">
                    {showMore ? description : `${description.substring(0, 70)}...`}
                </p>
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-blue-500 text-xs md:text-sm mt-2 flex justify-start"
                >
                    {showMore ? 'Show Less' : 'Read More'}
                </button>
                <div className="flex gap-1 my-4 text-sm md:text-base">
                    <span title="price" className="text-blue-500 font-semibold">N{price}</span>
                    <span title="nights">/ Per Night</span>
                </div>
                <Link to=""
                      className="text-sm md:text-base text-center py-3 px-6 bg-blue-500 hover:bg-white hover:text-blue-500 text-white border border-blue-500 rounded-lg font-semibold transition duration-300"
                >See details</Link>
            </div>
        </article>
    )
}

export default ArticleSection;
