import {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import AdminService from "../../services/adminService.js";

const AdminAuthGuard = ({ element, isAuthRequired }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = AdminService.isAdminAuthenticated();
            setIsAuth(authenticated);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuth && !isAuthRequired) {
        return <Navigate to='/admin/dashboard' replace />;
    }

    if (!isAuth && isAuthRequired) {
        return <Navigate to='/admin/login' replace />;
    }

    return element;
};

export default AdminAuthGuard;
