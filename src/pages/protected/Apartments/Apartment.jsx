import apartmentService from "../../../services/apartmentService.js";
import {useState, useEffect, useCallback} from "react";
import { debounce } from "lodash";
import ApartmentComponent from "./ApartmentComponent.jsx";
import NoDataComponent from "../../../components/helpers/NoDataComponent.jsx";
import Spinner from "../../../components/Spinner.jsx";

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



    const fetchApartments = useCallback( async (searchTerm = '', sort = '', page = 1, limit = 20) => {
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
        }
    );


    useEffect(() => {
        const debouncedFetch = debounce(() => {
            fetchApartments(search, sortBy, pagination.currentPage);
        }, 500);

        debouncedFetch();
        return () => debouncedFetch.cancel();
    }, [search, sortBy, pagination.currentPage, fetchApartments]);



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
        return (
            <Spinner />
        )
    }

    return (
        <div className="mt-16 bg-transparent">
            {/*The search and filter block*/}
            { apartments.length > 0 &&
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
            }
            {/*Display error message*/}
            {error && (
                <div className="text-red-500 text-center my-4">
                    {error}
                </div>
            )}
            { apartments.length > 0 ?
                <div className={`text-blue-500 flex flex-wrap justify-evenly gap-6 transition-opacity duration-500 ${
                        loading ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    {
                        apartments.map((apartment, index) => (
                            <ApartmentComponent key={index} apartment={apartment} />
                        ))
                    }
                </div>
                    :
                <NoDataComponent title="No apartments found" description="Try changing your search or sorting criteria" />

            }

            {pagination.totalPages > 1 && (
                <div className="w-full my-8 flex">
                    <ul className="flex gap-3 text-blue-500 text-xl justify-between w-full">
                        <li
                            className={`cursor-pointer ${pagination.currentPage === 1 && "opacity-50 pointer-events-none"}`}
                            onClick={() => handlePageClick(pagination.currentPage - 1)}
                        >
                            Prev
                        </li>
                        <div className="flex gap-4">
                            {Array.from({ length: pagination.totalPages }, (_, i) => (
                                <li
                                    key={i}
                                    className={`cursor-pointer flex justify-center items-center w-7 h-7 text-base hover:bg-blue-100 rounded-full ${pagination.currentPage === i + 1 ? 'bg-blue-100 rounded-full' : ''}`}
                                    onClick={() => handlePageClick(i + 1)}
                                >
                                    {i + 1}
                                </li>
                            ))}
                        </div>
                        <li
                            className={`cursor-pointer ${pagination.currentPage === pagination.totalPages && "opacity-50 pointer-events-none"}`}
                            onClick={() => handlePageClick(pagination.currentPage + 1)}
                        >
                            Next
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Apartment;
