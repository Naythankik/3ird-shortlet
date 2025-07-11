import {useEffect, useState} from "react";
import AuthService from "../../services/authService.js";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ element, isAuthRequired }) => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = AuthService.isAuthenticated();
            setIsAuth(!!authenticated);
        };

        checkAuth();
    }, []);

    if (isAuth === null) {
        return null;
    }

    if (isAuth && !isAuthRequired) {
        return <Navigate to='/dashboard' replace />;
    }else if (!isAuth && isAuthRequired) {
        return <Navigate to='/login' replace />;
    }else{
        return element;
    }
};

export default AuthGuard;
