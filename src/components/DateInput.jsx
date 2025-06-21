import {useState} from "react";

const DateInput = () => {
    const [date, setDate] = useState("2025-04-10");
    return (
        <input
            className="p-2 text-sm md:text-base rounded-xl min-w-full focus:outline-none"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
    );
}
export default DateInput;
