import Image from "../../../assets/apartment.webp";
import {Link} from "react-router-dom";

const ApartmentComponent = (props) => {
        const { apartment } = props
        return (
            <article id={apartment.id} className="w-full md:w-96 transition-shadow duration-300 flex flex-col items-center justify-between gap-3">
                <div className="flex flex-nowrap overflow-x-scroll justify-evenly gap-6 w-full mb-3"
                     style={{scrollBehavior: 'smooth', scrollbarWidth: 'none'}}>
                    {apartment.images.map((image, index) => (
                        <img key={index} className="h-40 rounded-lg object-cover min-w-full" src={image} alt={apartment.name}/>
                        ))
                    }
                </div>
                <div className="flex gap-2 flex-col">
                    <Link to={`/apartment/${apartment.id}`} className="text-lg"
                          title={apartment.name}>{apartment.name}</Link>
                    <p className="text-gray-500 text-justify text-base" title={apartment.description}>
                        {`${apartment.description.length > 180 ? apartment.description.substring(0, 180) + '...' : apartment.description}`}
                    </p>
                    <p className="flex gap-2">Location:
                        <span
                            className="text-gray-500">{apartment?.address?.street + ', ' + apartment?.address?.country}</span>
                    </p>
                    <p className="flex gap-2">Price:
                        <span
                            className="text-gray-500">N{apartment.price}</span>
                    </p>

                </div>
            </article>
        );

}

export default ApartmentComponent;
