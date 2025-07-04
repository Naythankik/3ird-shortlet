const CardsComponent = ({ card, selectedCard, onCheck }) => {
    const Icon = card.icon;
    const checked = selectedCard === card.id;
    return (
        <label
            htmlFor={card.name}
            className={`border p-2 justify-be rounded-lg flex justify-between items-center cursor-pointer transition ${
                checked ? "border-green-400 bg-green-50" : "bg-transparent"
            }`}
        >
            <div className="flex gap-2">
                <Icon className={`text-xl mt-1.5 text-${card.color}-600`} />
                <div className="flex flex-col">
                    <h4 className="text-xl font-bold">{card.number}</h4>
                    <p className="text-sm font-normal text-gray-400">{`Expiry ${card.expiry}`}</p>
                </div>
            </div>
            <input
                type="radio"
                id={card.name}
                name="card"
                value={card.id}
                checked={checked}
                onChange={() => onCheck(card.id)}
                className="appearance-none w-4 h-4 rounded-full border-2 border-gray-400
                   checked:border-4 checked:border-green-500"
            />
        </label>
    )
}

export default CardsComponent;
