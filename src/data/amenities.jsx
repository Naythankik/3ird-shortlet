import {Dumbbell, ParkingCircle, Thermometer, Tv, Utensils, Waves, Wifi} from "lucide-react";

const Amenities = [
    {
        icon: <Wifi className="w-8 h-8 text-blue-600" />,
        title: 'Superfast Wi-Fi speed',
        description: 'Enjoy blazing fast internet with no interruptions...',
    },
    {
        icon: <Thermometer className="w-8 h-8 text-blue-600" />,
        title: 'Air Conditioning',
        description: 'Stay cool and comfortable in all rooms...',
    },
    {
        icon: <Waves className="w-8 h-8 text-blue-600" />,
        title: 'Swimming Pool',
        description: 'Relax and unwind in the beautiful outdoor pool...',
    },
    {
        icon: <Dumbbell className="w-8 h-8 text-blue-600" />,
        title: 'Gym Facilities',
        description: 'Access a fully equipped gym during your stay...',
    },
    {
        icon: <ParkingCircle className="w-8 h-8 text-blue-600" />,
        title: 'Free Parking',
        description: 'Secure and free parking available for guests...',
    },
    {
        icon: <Utensils className="w-8 h-8 text-blue-600" />,
        title: 'Fully Equipped Kitchen',
        description: 'Cook your favorite meals with top-of-the-line appliances...',
    },
    {
        icon: <Tv className="w-8 h-8 text-blue-600" />,
        title: 'Flat Screen TV',
        description: 'Enjoy your favorite shows and movies on a large TV...',
    },
];

export default Amenities
