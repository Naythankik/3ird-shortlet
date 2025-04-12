import {Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import authService from "../../services/authService.js";
import {FaPowerOff} from "react-icons/fa";

function Layout() {
    const handleLogout = () => {
        authService.logout();
        window.location.reload();
    }

    const dayTime = () => {
        let date = new Date().getHours();

        if(date >= 0 && date < 12) {
            date = "Morning"
        }else if(date >= 12 && date < 16) {
            date = 'Afternoon'
        }else{
            date = 'Evening'
        }
        return date;
    }
    return (
        <div className="flex min-h-screen bg-blue-50">
            <Sidebar />
            <main className="flex-1 py-4 px-5">
                <div className="flex mb-5 justify-between text-blue-500">
                    <p className="text-base md:text-2xl font-bold">{dayTime()}, {authService.getUser()}</p>
                    <button
                        onClick={handleLogout}
                        className="text-lg text-red-500 flex gap-1 items-center"
                        title="Logout">
                        <FaPowerOff />
                        <span className="hidden md:inline-block">Logout</span>
                    </button>
                </div>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
