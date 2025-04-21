import apartmentService from "../../services/apartmentService.js";
import { useState, useEffect } from "react";
import spinner from "../Spinner.jsx";
import ApartmentComponent from "./Apartments/ApartmentComponent.jsx";

const Dashboard = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);

    const fetchApartments = async () => {
        try {
            setLoading(true);
            const { apartments: data } = await apartmentService.getApartments(`/apartments/read?page=1&limit=15`);
            setApartments(data);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
            setTimeout(() => setShowSpinner(false), 300);
        }
    };

    useEffect(() => {
        fetchApartments();
    }, []);

    if (loading) {
        return spinner.apartmentSpinner()
    }

    return (
        <div className="mt-10">

            {showSpinner ? spinner.apartmentSpinner() : (
                <div className="bg-yellow-50">
                    <div className={`text-blue-500 flex flex-nowrap justify-evenly gap-6 transition-opacity duration-500 ${
                            loading ? 'opacity-0' : 'opacity-100'
                        }`}>
                        {apartments.length > 0 ? (
                            apartments.map((apartment, index) => (
                                <ApartmentComponent key={index} apartment={apartment} />
                            ))
                        ) : (
                            <p>No apartments available</p>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default Dashboard;
