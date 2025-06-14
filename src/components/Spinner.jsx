import React from "react";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center min-h-[400px] md:min-h-[700px] bg-transparent">
            <div className="h-60 w-60 border-l-2 border-r-2 rounded-full animate-[spin_1s_linear_infinite] border-blue-500 flex items-center justify-center">
                <div className="border-b-2 border-t-2 h-48 rounded-full animate-[spin_1s_linear_infinite] w-48 border-blue-400 flex items-center justify-center">
                    <div className="border-b-2 border-t-2 rounded-full animate-[spin_1s_linear_infinite] h-36 w-36 border-blue-400 rotate-90"></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner;
