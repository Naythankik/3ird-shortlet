import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-2 md:p-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Where do you want to stay?"
                        className="w-full pl-12 pr-4 py-3 rounded-lg text-blue-500 border-2 border-gray-200 outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex gap-2">
                    <input
                        type="date"
                        className="p-3 rounded-lg w-full text-blue-500 border-2 border-gray-200 outline-none focus:border-blue-500"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors duration-200">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
