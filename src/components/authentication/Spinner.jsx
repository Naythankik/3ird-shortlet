class Spinners  {

    apartmentSpinner() {
        return (
            <div className="flex flex-wrap justify-evenly gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full md:w-96 animate-pulse flex flex-col gap-3">
                        <div className="bg-blue-200 h-56 w-full rounded-lg"/>
                        <div className="h-5 bg-blue-200 rounded w-2/3"/>
                        <div className="h-4 bg-blue-100 rounded w-full"/>
                        <div className="h-4 bg-blue-100 rounded w-5/6"/>
                        <div className="h-4 bg-blue-100 rounded w-1/2"/>
                    </div>
                ))}
            </div>
        )
    }

    buttonSpinner(text){
        return (
            <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{text}</span>
            </div>
        );
    }
}

const spinner = new Spinners()
export default spinner;
