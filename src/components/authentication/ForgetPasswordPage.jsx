import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService.js";
import spinner from "../Spinner.jsx";

const ForgetPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        if (!email) {
            setError('Please enter your email address');
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.forgetPassword({ email });
            console.log(response)
            return

            if (response) {
                setSuccessMessage('If the email exists, a password reset link has been sent.');
            } else {
                setError('Password reset request failed. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }

        setTimeout(() => {
            navigate('/login');
        }, 5000)
    };

    return (
        <div>
            <main className="flex flex-col w-[90%] md:w-2/5 mx-auto py-8 gap-4">
                <form onSubmit={handleSubmit} method='post'>
                    <fieldset className="w-full shadow-2xl p-9 rounded-md flex flex-col gap-5 text-blue-500">
                        <span className="text-red-400 text-sm italic text-center capitalize">{error}</span>
                        <span className="text-green-400 text-sm italic text-center capitalize">{successMessage}</span>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-base md:text-lg">Email</label>
                            <input
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            {
                                isLoading ? spinner.buttonSpinner('Sending reset link...') :
                                    <button
                                        className={`${isLoading && 'italic'} bg-blue-500 hover:text-blue-500 text-white hover:bg-white border-2 border-blue-500 rounded-lg px-3 py-2`}
                                        id="submit"
                                    >
                                        Send Reset Link
                                    </button>
                            }
                        </div>
                    </fieldset>
                </form>
                <Link to='/login' className="underline text-blue-500 text-center" title="Go back to login">
                    Remember your password? Login here
                </Link>
            </main>
        </div>
    );
};

export default ForgetPasswordPage;
