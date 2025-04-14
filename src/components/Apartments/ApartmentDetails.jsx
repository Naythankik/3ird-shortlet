import {Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import apartmentService from "../../services/apartmentService.js";
import spinner from "../Spinner.jsx";

const ApartmentDetails = () => {
    const { apartmentId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [apartment, setApartment] = useState(null);

    const fetchApartment = async (id) => {
        try {
            setLoading(true);
            const { apartment: data } = await apartmentService.getAnApartment(id);
            console.log(data);
            setApartment(data);
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.errors || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApartment(apartmentId);
    }, [apartmentId]);

    if (loading) {
        return spinner.apartmentSpinner();
    }

    return (
        <div>
            {error && <p className="text-red-600">{error}</p>}
            {!apartment && !error && <p>No apartment found.</p>}

            {apartment && (
                <div className="bg-white p-6 shadow-md rounded-lg max-w-5xl mx-auto mt-6">
                    <div className="full flex flex-nowrap overflow-x-scroll justify-evenly gap-6 w-full mb-3"
                         style={{scrollBehavior: 'smooth', scrollbarWidth: 'none'}}>
                        {apartment.images?.map((image, i) => (
                            <img key={i} src={image.url} alt={image.name}
                                 className="h-96 rounded-lg object-cover min-w-full"/>
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-blue-500">
                        <h1 className="text-2xl font-bold mb-2">{apartment.name}</h1>
                        <Link to={`/apartments/${apartmentId}`}
                              className="border-blue-500 border-2 py-2 px-6 rounded-lg">Book apartment</Link>
                    </div>

                    <div className="text-gray-600 mb-4">
                        <p>
                            <strong>Address:</strong> {`${apartment.address.street}, ${apartment.address.city}, ${apartment.address.state}, ${apartment.address.country} (${apartment.address.postcode})`}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700">
                            <strong>Price: </strong>
                            ${apartment.price.toLocaleString()}{" "}
                            {apartment.discount && (
                                <span className="text-green-600 ml-2">
                                    ({apartment.discount.percentage}% off!)
                                </span>
                            )}
                        </p>
                    </div>

                    <p className="text-gray-700 mb-4">{apartment.description}</p>

                    <div className="mb-4">
                        <p className="text-lg font-semibold">Properties</p>
                        <ul className="list-disc list-inside text-gray-600 text-justify">
                            {apartment.properties?.map((property, i) => (
                                <li key={i}>{property}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <p className="text-lg font-semibold">Rules:</p>
                        {apartment.rules?.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-600 text-justify">
                                {apartment.rules.map((rule, i) => (
                                    <li key={i}>{rule}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No rules provided</p>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default ApartmentDetails;
