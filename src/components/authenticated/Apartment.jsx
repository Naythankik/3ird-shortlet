import apartmentService from "../../services/apartmentService.js";
import { useState, useEffect } from "react";
import Image from '../../assets/apartment.webp';
import {Link} from "react-router-dom";
import {debounce} from "lodash";
import spinner from "../Spinner.jsx";

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

            if (Array.isArray(data)) {
                setApartments(data);
                setPagination(pagination);
            } else {
                console.error("Expected an array, but got:", data);
            }
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

    const ApartmentsArticle = (props) => {
        const { apartment } = props
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
                            <ApartmentsArticle key={index} apartment={apartment} />
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
        ;
}

export default Apartment;
