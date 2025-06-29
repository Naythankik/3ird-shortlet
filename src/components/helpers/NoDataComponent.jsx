import React from 'react';
import NoImage from '../../assets/no-data.png'

const NoDataComponent = ({title, description}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-16">
            <h1 className="text-lg md:text-2xl text-blue-500 font-bold">{title}</h1>
            <div className="bg-transparent w-full md:w-[45%]">
                <img src={NoImage} alt="No data" className="w-full h-full rounded-3xl"/>
            </div>
            <p className="text-gray-500">{description}</p>
        </div>
    )
}


export default NoDataComponent;
