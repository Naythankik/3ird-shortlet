import { Star } from "lucide-react";
import {Link} from "react-router-dom";
import {BiDotsVertical} from "react-icons/bi";
import { useState } from "react";

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={15}
                    className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
            ))}
        </div>
    );
};

const ReviewButton = ({reviewId}) => {
    return (
        <div className="text-gray-500 text-sm flex flex-col gap-4 md:gap-0 md:flex-row justify-between my-3 md:items-center">
            <span>Was this review helpful?</span>
            <div className="flex justify-between md:justify-evenly gap-4">
                {["Yes", "No"].map((option, i) => (
                    <button
                        key={i}
                        onClick={() => handleHelpfulRequest(reviewId, option)}
                        className="bg-transparent py-[5px] px-4 border-2 rounded-md hover:bg-gray-50"
                        title="This review was helpful!">{option}
                    </button>
                ))}
            </div>
        </div>
    )
}

const handleHelpfulRequest = async (id, option) => {
    // console.log(option, id);
}

function ReviewList({reviews}) {
    const [activeOptionsId, setActiveOptionsId] = useState(null);

    const toggleOptions = (id) => {
        setActiveOptionsId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="w-full mx-auto p-4">
            <p className="text-base md:text-lg font-semibold mb-4">Customer Reviews</p>
            <div className="space-y-2">
                {reviews.slice(0, 3).map(review => (
                    <div key={review.id} className="flex flex-col md:flex-row gap-4 bg-white shadow-md rounded-2xl p-4 relative">
                        <img
                            src={review.user.profilePicture}
                            alt={review.user.firstName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-medium text-gray-800 text-justify">{`${review.user.firstName} ${review.user.lastName}`}</h4>
                                </div>
                                <BiDotsVertical className="cursor-pointer" onClick={() => toggleOptions(review.id)} />
                                {activeOptionsId === review.id && (
                                    <div className="absolute right-4 top-10 bg-gray-100 border-2 rounded-xl shadow-md p-1 w-fit text-sm">
                                        <button className="block w-full text-left px-4 py-2 hover:opacity-25">Report</button>
                                        <button className="block w-full text-left px-4 py-2 hover:opacity-25">Block</button>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-5 items-center">
                                <StarRating rating={review.rating} />
                                <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="mt-2 text-gray-700">{review.comment}</p>
                            <p className="text-gray-500 text-sm my-2">{`${review.relevant.toLocaleString()} people found this helpful`}</p>
                            <ReviewButton reviewId={review.id} />
                        </div>
                    </div>)
                )}
            </div>
            <Link to='/' className="text-blue-500 hover:underline text-sm mt-2 inline-block">
                See all reviews
            </Link>

        </div>
    );
}

export default ReviewList;
