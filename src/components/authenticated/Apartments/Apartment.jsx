import apartmentService from "../../../services/apartmentService.js";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import spinner from "../../Spinner.jsx";
import ApartmentComponent from "./ApartmentComponent.jsx";

const Apartment = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState("");
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });

    const sortOptions = [
        { value: "date", label: "Date" },
        { value: "name", label: "Name" },
        { value: "price", label: "Price" },
        { value: "rating", label: "Rating" }
    ];



    const fetchApartments = async (searchTerm = '', sort = '', page = 1, limit = 20) => {
        try {
            setLoading(true);
            const url = `/apartments/read?page=${page}&sortBy=${sort}&limit=${limit}&search=${searchTerm}`;

            const { apartments: data, pagination } = await apartmentService.getApartments(url);

            setApartments(data);
            setError(null)
            setPagination(pagination);
        } catch (err) {
            setError(err.message || 'Failed to fetch apartments');
            console.log(err.message);
        } finally {
            setLoading(false);
            setTimeout(() => setShowSpinner(false), 300);
        }
    };

    useEffect(() => {
        const debouncedFetch = debounce(() => {
            fetchApartments(search, sortBy, pagination.currentPage);
        }, 500);

        debouncedFetch();
        return () => debouncedFetch.cancel();
        },
        [search, sortBy, pagination.currentPage, fetchApartments]
    );


    const handlePageClick = (page) => {
        if (page < 1 || page > pagination.totalPages) return;
        fetchApartments(search, sortBy, page);
    };

    const handleSort = (e) => {
        setSortBy(e.target.value);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };


    if (loading && showSpinner) {
        return spinner.apartmentSpinner()
    }

    return (
        <>
            <div className="w-full my-5 flex justify-between">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for an apartment"
                    className="border-2 focus-visible:outline-blue-500 text-blue-500 rounded-lg py-1 px-3 w-1/3 placeholder-blue-500 border-blue-500"
                />

                <select
                    className="border-2 focus-visible:outline-blue-500 text-blue-500 rounded-lg py-1 px-3 w-1/3 placeholder-blue-500 border-blue-500 bg-transparent"
                    value={sortBy}
                    onChange={handleSort}
                >
                    <option value="" disabled>Sort by</option>
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <div className="text-red-500 text-center my-4">
                    {error}
                </div>
            )}


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
