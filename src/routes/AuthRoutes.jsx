import LandingPage from "../pages/public/LandingPage.jsx";
import AboutPage from "../pages/public/AboutPage.jsx";
import BlogsPage from "../pages/public/BlogsPage.jsx";
import ContactPage from "../pages/public/ContactPage.jsx";
import PricingPage from "../pages/public/PricingPage.jsx";
import ServicePages from "../pages/public/ServicesPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import CreatePage from "../pages/auth/CreatePage.jsx";
import VerifyAccountPage from "../pages/auth/VerifyAccountPage.jsx";
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import AuthGuard from "../components/AuthGuard.jsx";

const AuthRoutes = () => {
    return  [
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
}

export default AuthRoutes;
