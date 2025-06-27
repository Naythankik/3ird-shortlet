import {IoIosLocate} from "react-icons/io";
import {BsPeople} from "react-icons/bs";
import {MdOutlineBedroomParent} from "react-icons/md";
import {Link} from "react-router-dom";

const ApartmentCard = ({props}) => {
    return (
        <article className="w-full md:w-auto border-2 bordero-gray-100 rounded-xl">
            <Link to={`/apartment/${props.id}`} className="w-full h-full">
                <div className="w-full h-56">
                    <img src={props?.images[0]} alt={props?.name} className="w-full h-full rounded-t-lg object-cover" />
                </div>
                <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{`${props?.name.slice(0, 40)}...`}</h3>
                    <p className="text-base flex items-center gap-2"><IoIosLocate /> {props?.address?.city}</p>
                    <p className="text-xl font-bold">{`NGN ${props?.price.toLocaleString()}`}</p>
                    <div className="flex gap-3">
                        <div className="flex gap-1 items-center text-sm border-2 w-fit rounded-md px-2 py-1" title="Maximum number of guests">
                            <BsPeople />
                            <p>{props.maxGuests}</p>
                        </div>
                        <div className="flex gap-1 items-center text-sm border-2 w-fit rounded-md px-2 py-1" title="Number of bedroom">
                            <MdOutlineBedroomParent />
                            <p>
                                {
                                    props?.properties.find(p => p.name.toLowerCase().includes("bed"))?.quantity || 1
                                }
                            </p>
                        </div>

                    </div>
                </div>
            </Link>
        </article>
    )
}

export default ApartmentCard;
