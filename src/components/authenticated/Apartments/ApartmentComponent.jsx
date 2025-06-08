import {Link} from "react-router-dom";
import ImageCarousel from "../ImageCarousel.jsx";

const ApartmentComponent = ({ apartment }) => {

    return (
            <article
                id={apartment.id}
                className="w-full md:w-96 transition-shadow duration-300 hover:shadow-xl p-4 rounded-xl border border-gray-200"
            >
                {/* Image carousel */}
                <ImageCarousel images={apartment.images} name={apartment.name} />
                <div className="flex gap-2 flex-col">
                    <Link to={`/apartment/${apartment.id}`} className="text-lg"
                          title={apartment.name}>{apartment.name}</Link>
                    <p className="text-gray-400 text-justify text-base">
                        {apartment.description?.length > 180
                            ? `${apartment.description.substring(0, 180)}...`
                            : apartment.description}
                    </p>

                    <p className="flex gap-2">Location:
                        <span className="text-gray-500">
                            {apartment?.address?.street && apartment?.address?.country
                                ? `${apartment.address.street}, ${apartment.address.country}`
                                : 'Not specified'}
                        </span>
                    </p>

                    <p className="flex gap-2">Price:
                        <span className="text-gray-500">
                            {apartment?.price ? `N${apartment.price}` : 'Contact for price'}
                        </span>
                    </p>


                </div>
            </article>
        );

}

export default ApartmentComponent;
