import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import authService from "../../services/authService.js";
import spinner from "../Spinner.jsx";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        if (!password || !confirmPassword) {
            setError('Please fill in both password fields');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.resetPassword(token, { password, confirmPassword });
            if(response){
                setSuccessMessage('Password reset successful. Please login to continue.');
                setTimeout(() => {
                    navigate('/login');
                }, 5000)
            }
        }catch (e){
            if(String(e.message).includes('expired reset token')){
                setError('The token has expired.You\'re getting redirected to the forget password page')
                setTimeout(() => {
                    navigate('/forget-password')
                }, 3000)
                return
            }
            setError(e.message || 'An error occurred. Please try again.');
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <main className="flex flex-col w-[90%] md:w-2/5 mx-auto py-8 gap-4">
                <form onSubmit={handleSubmit} method='post'>
                    <fieldset className="w-full shadow-2xl p-9 rounded-md flex flex-col gap-5 text-blue-500">
                        <span className="text-red-400 text-sm italic text-center capitalize">{error}</span>
                        <span className="text-green-400 text-sm italic text-center capitalize">{successMessage}</span>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-base md:text-lg">New Password</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2 w-full"
                                    id="password"
                                    type={ showPassword.new ? 'text' : 'password' }
                                    placeholder="Enter your new password"
                            />
                                <span
                                    className="flex items-center absolute right-5 top-0 bottom-0 cursor-pointer text-blue-500 hover:text-blue-500"
                                    onClick={() => setShowPassword(prevState => ({...prevState, new: !prevState.new}))}>
                                    {showPassword.new ? <FaEyeSlash/> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirmPassword" className="text-base md:text-lg">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2 w-full"
                                    id="confirmPassword"
                                    type={ showPassword.confirm ? 'text' : 'password' }
                                    placeholder="Confirm your new password"
                                />
                                <span
                                    className="flex items-center absolute right-5 top-0 bottom-0 cursor-pointer text-blue-500 hover:text-blue-500"
                                    onClick={() => setShowPassword(prevState => ({...prevState, confirm: !prevState.confirm}))}>
                                    {showPassword.confirm ? <FaEyeSlash/> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {
                                isLoading ? spinner.buttonSpinner('Resetting password...') :
                                    <button
                                        className={`${isLoading && 'italic'} bg-blue-500 hover:text-blue-500 text-white hover:bg-white border-2 border-blue-500 rounded-lg px-3 py-2`}
                                        id="submit"
                                    >
                                        Reset Password
                                    </button>
                            }
                        </div>
                    </fieldset>
                </form>
                <Link to='/login' className="underline text-blue-500 text-center" title="Go back to login">
                    Remembered your password? Login here
                </Link>
            </main>
        </div>
    );
};

export default ResetPasswordPage;
