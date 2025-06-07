import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-evenly p-6 text-center">
            <div className="w-[60%] md:w-[30%]">
                <img src="/src/assets/404.png" alt="404 Not Found" className="w-full h-auto" />
            </div>
            <div className="flex flex-col items-center gap-4 mt-6 md:mt-0">
                <h1 className="text-5xl font-bold text-red-600">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Page Not Found</h2>
                <p className="text-gray-600">
                    Oops! The page you're looking for doesn't exist or is under construction.
                </p>
                <Link to="/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                    Go back home
                </Link>
            </div>
        </div>
    );
};

export default NoMatch;
