import Header from "./index/Header.jsx";
import Footer from "./index/Footer.jsx";
import { Outlet } from "react-router-dom";

function PublicLayout() {
    return <div className="relative flex flex-col min-h-screen justify-between">
        <Header />
        <Outlet />
        <Footer />
    </div>
}

export default PublicLayout;
