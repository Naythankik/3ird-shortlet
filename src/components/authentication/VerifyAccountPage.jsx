import Header from "../index/Header.jsx";
import spinner from "../Spinner.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../index/Footer.jsx";
import {useState} from "react";
import authService from "../../services/authService.js";

const VerifyAccountPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useParams();
    const [isRequestVerification, setIsRequestVerification] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const response = await authService.verifyAccount(token, otp);

            if(response.status === 498){
                setIsRequestVerification(true);
            }

            if(response.status === 200){
                setSuccess(response.data.message || 'Account verification successful. Redirecting to login page.');
                setTimeout(() => {
                    navigate('/login');
                }, 2000)
            }
        }catch (e){
            setError(e.message || 'An error occurred. Please try again.');
        }finally {
            setIsLoading(false);
        }
    }

    const handleReverification = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try{
            const response = await authService.requestVerification(token);
            if(response.status === 200){
                setSuccess(response.data.message);
                setIsRequestVerification(false);
                setTimeout(() => {
                    navigate('/home');
                }, 2000)
            }
        }catch (e){
            setError(e.message || 'An error occurred. Please try again.');
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Header />
            <main className="flex flex-col w-[90%] md:w-2/5 mx-auto py-8 gap-4">
                <form onSubmit={handleSubmit} method='post'>
                    <fieldset className="w-full shadow-2xl p-9 rounded-md flex flex-col gap-5 text-blue-500">
                        <span className="text-red-400 text-sm italic text-center capitalize">{error}</span>
                        <span className="text-green-400 text-sm italic text-center capitalize">{success}</span>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="otp" className="text-base md:text-lg">One Time Pin</label>
                            <input
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                id="otp"
                                type="text"
                                placeholder="Enter OTP sent to your email address"
                            />
                            {isRequestVerification &&
                                <button
                                    onClick={handleReverification}
                                    className="underline"
                                >
                                    Request reverification
                                </button>}
                        </div>

                        <div className="flex flex-col gap-2">
                            {
                                isLoading ? spinner.buttonSpinner('Verifying OTP...') :
                                    <button
                                        className={`${isLoading && 'italic'} bg-blue-500 hover:text-blue-500 text-white hover:bg-white border-2 border-blue-500 rounded-lg px-3 py-2`}
                                        id="submit"
                                    >
                                        Verify Account
                                    </button>
                            }
                        </div>
                    </fieldset>
                </form>
            </main>
            <Footer />
        </div>
    )
}

export default VerifyAccountPage;
