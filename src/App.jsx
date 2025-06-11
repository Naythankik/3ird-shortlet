import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AboutPage from "./components/index/AboutPage.jsx";
import BlogsPage from "./components/index/BlogsPage.jsx";
import ContactPage from "./components/index/ContactPage.jsx";
import PricingPage from "./components/index/PricingPage.jsx";
import ServicePages from "./components/index/ServicesPage.jsx";
import LandingPage from "./components/index/LandingPage.jsx";
import LoginPage from "./components/authentication/LoginPage.jsx";
import CreatePage from "./components/authentication/CreatePage.jsx";
import ForgetPasswordPage from "./components/authentication/ForgetPasswordPage.jsx";
import ResetPasswordPage from "./components/authentication/ResetPasswordPage.jsx";
import Dashboard from "./components/authenticated/Dashboard.jsx";
import Layout from "./components/authenticated/Layout.jsx";
import PublicLayout from "./components/PublicLayout.jsx";
import NoMatch from "./components/NoMatch.jsx";

import AuthService from "./services/authService.js";
import VerifyAccountPage from "./components/authentication/VerifyAccountPage.jsx";
import { useEffect, useState } from "react";
import Apartment from "./components/authenticated/Apartments/Apartment.jsx";
import ApartmentDetails from "./components/authenticated/Apartments/ApartmentDetails.jsx";
import BookApartment from "./components/authenticated/Bookings/BookApartment.jsx";
import Booking from "./components/authenticated/Bookings/Booking.jsx";
import Wishlist from "./components/authenticated/Wishlists/Wishlist.jsx";

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

const routes = createBrowserRouter([
    {
        path: '/*',
        element: <NoMatch />
    },
    {
        element: <PublicLayout />,
        children: [
            {
                path: "/",
                element: <LandingPage />
            },
            {
                path: '/about',
                element: <AboutPage />
            },
            {
                path: '/blogs',
                element: <BlogsPage />
            },
            {
                path: '/contact',
                element: <ContactPage />
            },
            {
                path: '/pricing',
                element: <PricingPage />
            },
            {
                path: '/services',
                element: <ServicePages />
            },
            {
                path: '/login',
                element: <AuthGuard element={<LoginPage />} isAuthRequired={false} />
            },
            {
                path: '/register',
                element: <AuthGuard element={<CreatePage />} isAuthRequired={false} />
            },
            {
                path: 'verify-email/:token',
                element: <AuthGuard element={<VerifyAccountPage />} isAuthRequired={false} />
            },
            {
                path: '/forget-password',
                element: <AuthGuard element={<ForgetPasswordPage />} isAuthRequired={false} />
            },
            {
                path: '/reset-password/:token',
                element: <AuthGuard element={<ResetPasswordPage />} isAuthRequired={false} />
            },
        ]
    },
    {
        element: <Layout />,
        children: [
            {
                path: '/dashboard',
                element: <AuthGuard element={<Dashboard />} isAuthRequired={true} />
            },
            {
                path: '/apartments',
                element: <AuthGuard element={<Apartment />} isAuthRequired={true} />
            },
            {
                path: '/bookings',
                element: <AuthGuard element={<Booking />} isAuthRequired={true} />
            },
            {
                path: '/wishlists',
                element: <AuthGuard element={<Wishlist />} isAuthRequired={true} />
            },
            {
                path: '/apartment/:apartmentId',
                element: <AuthGuard element={<ApartmentDetails />} isAuthRequired={true} />
            },
            {
                path: '/apartment/:apartmentId/book/:name',
                element: <AuthGuard element={<BookApartment />} isAuthRequired={true} />
            },
        ]
    },
    ]
);

const App = () => {
    return <RouterProvider router={ routes } />
}

export default App;
