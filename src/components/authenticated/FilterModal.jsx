// src/components/Dashboard/FilterModal.jsx
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";

const FilterModal = ({ filters, setFilters, onClose }) => {
    const handleChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="bg-white rounded-xl max-w-md w-full p-6"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Filters</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <MdClose />
                    </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                    </label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={filters.priceRange[0]}
                            onChange={e => handleChange('priceRange', [
                                parseInt(e.target.value),
                                filters.priceRange[1]
                            ])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Min"
                        />
                        <input
                            type="number"
                            value={filters.priceRange[1]}
                            onChange={e => handleChange('priceRange', [
                                filters.priceRange[0],
                                parseInt(e.target.value)
                            ])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Max"
                        />
                    </div>
                </div>

                {/* Bedrooms */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms
                    </label>
                    <select
                        value={filters.bedrooms}
                        onChange={e => handleChange('bedrooms', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="any">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                    </select>
                </div>

                {/* Property Type */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type
                    </label>
                    <select
                        value={filters.propertyType}
                        onChange={e => handleChange('propertyType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="any">Any</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="studio">Studio</option>
                    </select>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amenities
                    </label>
                    <div className="space-y-2">
                        {['wifi', 'pool', 'gym', 'parking', 'ac'].map(amenity => (
                            <label key={amenity} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.amenities.includes(amenity)}
                                    onChange={e => {
                                        const newAmenities = e.target.checked
                                            ? [...filters.amenities, amenity]
                                            : filters.amenities.filter(a => a !== amenity);
                                        handleChange('amenities', newAmenities);
                                    }}
                                    className="mr-2"
                                />
                                <span className="capitalize">{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setFilters({
                            priceRange: [0, 5000],
                            amenities: [],
                            bedrooms: 'any',
                            propertyType: 'any'
                        })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Reset
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Apply
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FilterModal;
