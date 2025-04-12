import apartmentService from "../../services/apartmentService.js";
import { useState, useEffect } from "react";
import Image from '../../assets/apartment.webp';
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApartments = async () => {
        try {
            const { apartments: data, pagination } = await apartmentService.getApartments();
            if (Array.isArray(data)) {
                setApartments(data);
            } else {
                console.error("Expected an array, but got:", data);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApartments();
    }, []);

    const ApartmentsArticle = (props) => {
        const { apartment } = props
        console.log(apartment);
        return (
                <article id={apartment.id} className="w-full md:w-96 transition-shadow duration-300 flex flex-col items-center justify-between gap-3">
                    <div className="w-full">
                        {Array.isArray(apartment.image) && apartment.image.length > 0 ? (
                            apartment.image.map((image, index) => (
                                <img key={index} className="w-full" src={Image} alt={apartment.name}/>
                            ))
                        ) : (
                            <img key={apartment.id} className="w-full" src={Image} alt={apartment.name}/>
                        )}
                    </div>
                    <div className="flex gap-2 flex-col">
                        <Link to={`/apartments/${apartment.name}`} className="text-lg"
                              title={apartment.name}>{apartment.name}</Link>
                        <p className="text-gray-500 text-justify text-base" title={apartment.description}>
                            {`${apartment.description.length > 140 ? apartment.description.substring(0, 180) + '...' : apartment.description}`}
                        </p>
                        <p className="flex gap-2">Location:
                            <span
                                className="text-gray-500">{apartment.address.street + ', ' + apartment.address.country}</span>
                        </p>
                        <p className="flex gap-2">Price:
                            <span
                                className="text-gray-500">N{apartment.price}</span>
                        </p>

                    </div>
                </article>
                );


                }

                if (loading) {
                    return <p>Loading...</p>;
                }

                return (
                    <div className="text-blue-500 flex flex-wrap justify-evenly gap-6 max-h-4">
                        {apartments.length > 0 ? (
                            apartments.map((apartment, index) => (
                                <ApartmentsArticle key={index} apartment={apartment}/>
                            ))
                        ) : (
                            <p>No apartments available</p>
                        )}
                    </div>
                );
}

                export default Dashboard;
