import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

function Layout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 py-4 px-5">
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;
