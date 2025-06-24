import AdminLayout from "../pages/protected/AdminLayout.jsx";
import AdminDashboard from "../pages/protected/admin/AdminDashboard.jsx";
import AdminLoginPage from "../pages/auth/Admin/AdminLoginPage.jsx";
import UserManagement from "../pages/protected/admin/UserManagement.jsx";
import ApartmentManagement from "../pages/protected/admin/ApartmentManagement.jsx";
import AdminAuthGuard from "../components/guards/AdminAuthGuard.jsx";

const AdminRoutes = [
    {
        path: 'login',
        element:<AdminAuthGuard element={ <AdminLoginPage />} isAuthRequired={false} />
    },
    {
        element: <AdminLayout />,
        children: [
            {
                path: 'dashboard',
                element: <AdminAuthGuard element={<AdminDashboard />} isAuthRequired={true} />
            },
            {
                path: 'users',
                element: <UserManagement />
            },
            {
                path: 'apartments',
                element: <ApartmentManagement />
            }
        ]
    }
    ]

export default AdminRoutes;
