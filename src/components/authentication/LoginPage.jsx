import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "../../services/authService.js";

const LoginPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false)
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setError('')
    }, [email, password])

    const doLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if(!email || !password){
            setError('Please enter all fields are required')
            setIsLoading(false)
            return;
        }

        const user = { email, password };

        try{
            const response = await authService.login(user);

            if(response){
                return navigate('/dashboard');
            }else{
                setError('Login failed')
            }
        }catch(error){
            setError(error.message || 'Login failed.');
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex flex-col w-[90%] md:w-2/5 mx-auto py-8 gap-4">
            <form onSubmit={doLogin} method='post'>
                <fieldset className="w-full shadow-2xl p-9 rounded-md flex flex-col gap-5 text-blue-500">
                    <span className="text-red-400 text-sm italic text-center capitalize">{error}</span>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-base md:text-lg">Email</label>
                        <input name="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                               id="email" type="email" placeholder="Enter your email address"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-base md:text-lg">Password</label>
                        <div className="relative">
                            <input name="password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2 w-full"
                                   id="password" type={ showPassword ? 'text' : 'password' } placeholder="Enter your password" />
                                <span
                                    className="flex items-center absolute right-5 top-0 bottom-0 cursor-pointer text-blue-500 hover:text-blue-500"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash/> : <FaEye />}
                                </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between text-sm mt-3">
                            <div className="flex gap-1">
                                <input
                                    type="checkbox"
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    id="remember me" name="rememberMe" className="cursor-pointer"
                                    value={rememberMe}/>
                                <label htmlFor="remember me">Remember me</label>
                            </div>
                            <Link to='/forget-password' className="underline text-right">Forget password</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            disabled={isLoading}
                            className={`${isLoading ? 'opacity-25' : 'opacity-100 cursor-pointer'} bg-blue-500 text-white border-2 border-blue-500 rounded-lg px-3 py-2`}
                            id="submit">{isLoading ? 'Logging.........' : 'Login'}
                        </button>
                    </div>
                </fieldset>
            </form>
            <Link to='/register' className="underline text-blue-500 text-center"
                  title="Create an account to own or rent an apartment">Register Account</Link>
        </main>
    );
};

export default LoginPage;
