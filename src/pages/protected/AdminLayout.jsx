import {Outlet} from "react-router-dom";

const AdminLayout = () => {
    return <main>
        <header>The admin page header</header>
        <Outlet />
    </main>
}

export default AdminLayout;
