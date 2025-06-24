import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/protected/Layout.jsx";
import PublicLayout from "./components/PublicLayout.jsx";
import NoMatch from "./components/NoMatch.jsx";

import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import AuthRoutes from "./routes/AuthRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";

const routes = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [...AuthRoutes]
    },
    {
        element: <Layout />,
        children: [...ProtectedRoutes]
    },
    {
        path: '/admin',
        children: [...AdminRoutes]
    },
    {
        path: '/*',
        element: <NoMatch />
    }
    ]
);

const App = () => {
    return <RouterProvider router={ routes } />
}

export default App;
