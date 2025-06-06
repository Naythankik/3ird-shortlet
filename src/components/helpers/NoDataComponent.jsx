import React from 'react';

const NoDataComponent = ({title, description}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-lg md:text-2xl text-blue-500 font-bold">{title}</h1>
            <div className="bg-red-100 w-full md:w-[45%]">
                <img src="/src/assets/no-data.png" alt="No data" className="w-full h-full"/>
            </div>
            <p className="text-gray-500">{description}</p>
        </div>
    )
}


export default NoDataComponent;
