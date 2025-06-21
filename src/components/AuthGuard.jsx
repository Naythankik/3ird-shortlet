import {useEffect, useState} from "react";
import AuthService from "../services/authService.js";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ element, isAuthRequired }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = AuthService.isAuthenticated();
            setIsAuth(authenticated);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuth && !isAuthRequired) {
        return <Navigate to='/dashboard' replace />;
    }

    if (!isAuth && isAuthRequired) {
        return <Navigate to='/login' replace />;
    }

    return element;
};

export default AuthGuard;
