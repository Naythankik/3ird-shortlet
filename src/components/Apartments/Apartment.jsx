import apartmentService from "../../services/apartmentService.js";
import { useState, useEffect } from "react";
import {debounce} from "lodash";
import spinner from "../Spinner.jsx";
import ApartmentComponent from "./ApartmentComponent.jsx";

const Apartment = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });

    const fetchApartments = async (page = 1, searchQuery = '') => {
        try {
            setLoading(true);
            const query = searchQuery ? `?search=${searchQuery}&page=${page}` : `?page=${page}`;
            const { apartments: data, pagination } = await apartmentService.getApartments(`/apartments/read${query}`);

            setApartments(data);
            setPagination(pagination);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
            setTimeout(() => setShowSpinner(false), 300);
        }
    };

    useEffect(() => {
        const debouncedFetch = debounce(() => {
            fetchApartments(1, search);
        }, 500);

        debouncedFetch();

        return () => debouncedFetch.cancel();
    }, [search]);

    const handlePageClick = (page) => {
        fetchApartments(page, search);
    };

    if (loading) {
        return spinner.apartmentSpinner()
    }

    return (
        <>
            <div className="w-full my-5 flex justify-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for an apartment"
                    className="border-2 focus-visible:outline-blue-500 text-blue-500 rounded-lg py-1 px-3 w-1/3 placeholder-blue-500 border-blue-500"
                />

            </div>

            {showSpinner ? spinner.apartmentSpinner() : (
                <div
                    className={`text-blue-500 flex flex-wrap justify-evenly gap-6 transition-opacity duration-500 ${
                        loading ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    {apartments.length > 0 ? (
                        apartments.map((apartment, index) => (
                            <ApartmentComponent key={index} apartment={apartment} />
                        ))
                    ) : (
                        <p>No apartments available</p>
                    )}
                </div>
            )}

            {pagination.totalPages > 1 && (
                <div className="w-full my-8 flex justify-center">
                    <ul className="flex gap-3 text-blue-500 text-xl">
                        <li
                            className={`cursor-pointer ${pagination.currentPage === 1 && "opacity-50 pointer-events-none"}`}
                            onClick={() => handlePageClick(pagination.currentPage - 1)}
                        >
                            Prev
                        </li>
                        {Array.from({ length: pagination.totalPages }, (_, i) => (
                            <li
                                key={i}
                                className={`cursor-pointer px-2 ${pagination.currentPage === i + 1 ? 'font-bold underline' : ''}`}
                                onClick={() => handlePageClick(i + 1)}
                            >
                                {i + 1}
                            </li>
                        ))}
                        <li
                            className={`cursor-pointer ${pagination.currentPage === pagination.totalPages && "opacity-50 pointer-events-none"}`}
                            onClick={() => handlePageClick(pagination.currentPage + 1)}
                        >
                            Next
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default Apartment;
