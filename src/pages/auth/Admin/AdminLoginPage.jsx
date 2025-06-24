import { useState } from "react";
import {toast, ToastContainer} from "react-toastify";
import adminService from "../../../services/adminService.js";
import {useNavigate} from "react-router-dom";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            const response = await adminService.loginAdmin({email, password})

            if(response.success){
                navigate('/admin/dashboard')
            }else{
                toast.error(response.message)
            }
        }catch (err){
            toast.error(err.message || 'An error occurred. Please try again.');
        }finally {
            setLoading(false)
        }
    };

    return (
        <div className="bg-blue-100 min-h-screen flex justify-center items-center">
            <ToastContainer />
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-2/5 mx-5 p-8 rounded-xl bg-white shadow-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-blue-700 text-center">Admin Login</h2>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-blue-700 font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 border-gray-200 text-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-blue-700 font-medium">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-gray-200 text-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition"
                        required
                    />
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition ${loading && 'opacity-60'}`}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
