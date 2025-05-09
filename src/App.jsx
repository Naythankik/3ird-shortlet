import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/index/LandingPage.jsx';
import ContactPage from "./components/index/ContactPage.jsx";
import LoginPage from "./components/authentication/LoginPage.jsx";
import CreatePage from "./components/authentication/CreatePage.jsx";
import Layout from "./components/authenticated/Layout.jsx";
import Booking from "./components/authenticated/Bookings/Booking.jsx";
import authService from "./services/authService.js";
import NoMatch from "./components/NoMatch.jsx";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import('./components/authenticated/Dashboard'));
const Apartment = lazy(() => import('./components/authenticated/Apartments/Apartment'));
const ApartmentDetails = lazy(() => import('./components/authenticated/Apartments/ApartmentDetails'));

function AuthGuard({ element, requiresAuth }) {
    const isAuthenticated = authService.isAuthenticated();

    if (requiresAuth && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!requiresAuth && isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return element;
}

import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import AboutPage from "./components/index/AboutPage.jsx";
import BlogsPage from "./components/index/BlogsPage.jsx";
import ServicePages from "./components/index/ServicesPage.jsx";
import PricingPage from "./components/index/PricingPage.jsx";
import ForgetPasswordPage from "./components/authentication/ForgetPasswordPage.jsx";
import ResetPasswordPage from "./components/authentication/ResetPasswordPage.jsx";
import VerifyAccountPage from "./components/authentication/VerifyAccountPage.jsx";
import BookApartment from "./components/authenticated/Bookings/BookApartment.jsx";

function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status}</h1>
                <h2>{error.statusText}</h2>
                <p>{error.data}</p>
            </div>
        );
    }

    return <div>Something went wrong</div>;
}

function LazyComponent({ component: Component }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component />
        </Suspense>
    );
}

const router = createBrowserRouter([
    {
        path: "/about",
        element: <AuthGuard element={<AboutPage />} requiresAuth={false} />
    },
    {
        path: "/blogs",
        element: <AuthGuard element={<BlogsPage />} requiresAuth={false} />
    },
    {
        path: '/contact',
        element: <ContactPage />
    },
    {
        path: '/home',
        element: <LandingPage />
    },
    {
        path: '/pricing',
        element: <PricingPage />
    },
    {
        path: "/login",
        element: <AuthGuard element={<LoginPage />} requiresAuth={false} />
    },
    {
        path: "/account/verification/:token",
        element: <AuthGuard element={<VerifyAccountPage />} requiresAuth={false} />
    },
    {
        path: "/forget-password",
        element: <AuthGuard element={<ForgetPasswordPage />} requiresAuth={false} />
    },
    {
        path: "/forget-password/:token",
        element: <AuthGuard element={<ResetPasswordPage />} requiresAuth={false} />
    },
    {
        path: "/services",
        element: <AuthGuard element={<ServicePages />} requiresAuth={false} />
    },
    {
        path: "/register",
        element: <AuthGuard element={<CreatePage />} requiresAuth={false} />
    },
    {
        path: '/',
        element: <AuthGuard element={<Layout />} requiresAuth={true} />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" />
            },
            {
                path: 'dashboard',
                element: <LazyComponent component={Dashboard} />
            },
            {
                path: 'apartments',
                element: <Apartment />
            },
            {
                path: 'apartment/:apartmentId',
                element: <ApartmentDetails />
            },
            {
                path: 'apartment/:apartmentId/book/:name',
                element: <BookApartment />
            },
            {
                path: 'bookings',
                element: <Booking />
            },
            {
                path: '*',
                element: <NoMatch />
            }
        ]
    }
])

function App(){
    return <RouterProvider router={router} />
}


export default App;
