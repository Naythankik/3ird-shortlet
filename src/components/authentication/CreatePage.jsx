import Header from "../index/Header.jsx";
import Footer from "../index/Footer.jsx";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import authService from "../../services/authService.js";
import spinner from "../Spinner.jsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setError('')
    }, [email, password, confirmPassword, firstName, lastName, telephone])

    const doRegister = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if(!email || !password || !firstName || !lastName || !telephone || !dateOfBirth) {
            setError('All fields are required');
            setIsLoading(false)
            return;
        }

        if(password !== confirmPassword) {
            setError("Passwords don't match");
            setIsLoading(false)
            return
        }

        const user = { firstName, lastName, telephone, dateOfBirth, email, password };

        try{
            const response = await authService.register(user);

            if(response.status === 200){
                setSuccess(response.data.message || 'Registration successful. Redirecting to login page.');

                //Redirect the registered user after 5 seconds.
               setTimeout(() => {
                   navigate('/login')
               }, 5000)
            }else{
                setError('Registration failed')
            }
        }catch(error){
            console.log(error)
            setError(error.message || 'Registration failed.');
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Header/>
            <main className="flex flex-col w-[90%] md:w-2/5 mx-auto py-8 gap-4">
                <form onSubmit={doRegister} method='post'>
                    <fieldset className="w-full shadow-2xl p-9 rounded-md flex flex-col gap-5 text-blue-500">
                        <span className="text-red-400 text-sm italic text-center capitalize">{error}</span>
                        <span className="text-green-700 text-sm italic text-center capitalize">{success}</span>
                        {/*The default for responsive */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr]">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="firstname" className="text-base md:text-lg">First Name</label>
                                <input name="firstName"
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                                       className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                       id="firstname" type="text" placeholder="First Name"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="lastName" className="text-base md:text-lg">Last Name</label>
                                <input name="lastName"
                                       value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}
                                       className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                       id="lastName" type="text" placeholder="Last Name"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-base md:text-lg">Email</label>
                            <input name="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                   id="email" type="email" placeholder="Enter your email address"/>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr]">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="telephone" className="text-base md:text-lg">Telephone number</label>
                                <input name="telephone"
                                       value={telephone}
                                       onChange={(e) => setTelephone(e.target.value)}
                                       className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                       id="telephone" type="tel" placeholder="Enter your telephone"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="dateOfBirth" className="text-base md:text-lg">Date of birth</label>
                                <input name="dateOfBirth"
                                       value={dateOfBirth}
                                       onChange={(e) => setDateOfBirth(e.target.value)}
                                       className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2 w-full"
                                       id="dateOfBirth" type="date"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr]">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-base md:text-lg">Password</label>
                                <input name="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                       id="password" type="password" placeholder="Password"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmPassword" className="text-base md:text-lg">Confirm
                                    password</label>
                                <input name="confirmPassword"
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       className="border-2 border-blue-500 focus-visible:outline-blue-500 rounded-lg px-3 py-2"
                                       id="confirmPassword" type="password" placeholder="Confirm password"/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {
                                isLoading ? spinner.buttonSpinner('Registering.....') :
                                    <button
                                        className={`${isLoading && 'italic'} bg-blue-500 hover:text-blue-500 text-white hover:bg-white border-2 border-blue-500 rounded-lg px-3 py-2`}
                                        id="submit">Register
                                    </button>
                            }
                        </div>

                    </fieldset>
                </form>
                <Link to='/login' className="underline text-blue-500 text-center"
                      title="Create an account to own or rent an apartment">Have an account?</Link>
            </main>
            <Footer/>
        </div>
    );
};

export default LoginPage;
