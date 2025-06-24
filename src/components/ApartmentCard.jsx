const ApartmentCard = ({image, date, location}) => {
    return (
        <article className="max-w-full text-gray-700 flex flex-col gap-2">
            <img src={image} alt="Apartment" className="h-64 w-full rounded-lg object-cover" />
            <p className="text-lg">{date}</p>
            <p className="text-base font-medium">{location}</p>
            <button className="text-blue-600 hover:underline text-sm">Rebook</button>
        </article>
    )
}

export default ApartmentCard;
