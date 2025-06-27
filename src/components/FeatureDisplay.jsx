// FeatureDisplay.jsx
import {TbAirConditioning} from "react-icons/tb";
import {GiClothes, GiWashingMachine} from "react-icons/gi";
import { MdOutlineKitchen } from "react-icons/md";
import { FaWifi, FaBed } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";

const FEATURE_ICON_MAP = {
    "air conditioning": TbAirConditioning,
    wardrobe: GiClothes,
    "fully equipped kitchen": MdOutlineKitchen,
    "washing machine": GiWashingMachine,
    wifi: FaWifi,
    "king-sized bed": FaBed,
};

const FeatureDisplay = ({ title }) => {
    const Icon = FEATURE_ICON_MAP[title.toLowerCase()] ?? MdHelpOutline;

    return (
        <div className="flex items-center gap-2">
            <Icon className="text-xl shrink-0" />
            <p className="font-medium capitalize">{title}</p>
        </div>
    );
};

export default FeatureDisplay;
