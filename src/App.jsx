import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from './components/index/LandingPage.jsx';
import ContactPage from "./components/index/ContactPage.jsx";
import LoginPage from "./components/authentication/LoginPage.jsx";
import CreatePage from "./components/authentication/CreatePage.jsx";
import Dashboard from "./components/authenticated/Dashboard.jsx";
import Layout from "./components/authenticated/Layout.jsx";
import Apartment from "./components/Apartments/Apartment.jsx";
import Booking from "./components/authenticated/Booking.jsx";
import authService from "./services/authService.js";
import NoMatch from "./components/NoMatch.jsx";
import ApartmentDetails from "./components/Apartments/ApartmentDetails.jsx";

function App() {
    const isAuthenticated = authService.isAuthenticated();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<LandingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                    path="/login"
                    element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/register"
                    element={!isAuthenticated ? <CreatePage /> : <Navigate to="/dashboard" />}
                />

                {isAuthenticated && (
                    <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
                        <Route index element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="apartments" element={<Apartment />} />
                        <Route path="apartment/:apartmentId" element={<ApartmentDetails />} />
                        <Route path="bookings" element={<Booking />} />
                        <Route path="*" element={<NoMatch />} />

                    </Route>
                )}

                {!isAuthenticated && (
                    <Route path="*" element={<Navigate to="/login" replace />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
