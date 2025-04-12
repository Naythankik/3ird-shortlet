import Header from "../index/Header.jsx";
import Footer from "../index/Footer.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const LoginPage = () => {
    const [error, setError] = useState('The error is required.');
    const [email, setEmail] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [password, setPassword] = useState('')

    useEffect(() => {
        setError('')
    }, [email, password])

    return (
        <div>
            <Header/>
            <main className="flex flex-col w-[90%] md:w-2/5 mx-auto py-8 gap-4">
                <form>
                    <fieldset className="w-full shadow-2xl p-9 rounded-md flex flex-col gap-5 text-blue-500">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-base md:text-lg">Email</label>
                            <input name="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                   id="email" type="email" placeholder="Enter your email address"/>
                            <span className="text-red-400 text-sm md:text-xs italic">{error}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-base md:text-lg">Password</label>
                            <input name="password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                   id="password" type="password" placeholder="Enter your password"/>
                            <span className="text-red-400 text-sm md:text-xs italic">{error}</span>
                            <div className="flex flex-wrap -mt-2 items-center justify-between text-sm">
                                <div className="flex gap-1">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        id="rememberMe" name="rememberMe" className="cursor-pointer" value={rememberMe} />
                                    <label htmlFor="Remember me">Remember me</label>
                                </div>
                                <Link to='/forget-password' className="underline text-right">Forget password</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                className="bg-blue-500 hover:text-blue-500 text-white hover:bg-white border-2 border-blue-500 rounded-lg px-3 py-2"
                                id="submit">
                                Login
                            </button>
                        </div>
                    </fieldset>
                </form>
                <Link to='/register' className="underline text-blue-500 text-center" title="Create an account to own or rent an apartment">Register Account</Link>
            </main>
            <Footer/>
        </div>
    );
};

export default LoginPage;
