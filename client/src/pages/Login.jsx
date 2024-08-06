import axios from 'axios';
import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyCookie = async () => {
            if (cookies.token) {
                const { data } = await axios.post("http://localhost:3000", {}, { withCredentials: true });
                const { status } = data;
                status ? navigate("/") : null;
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;
    const handleOnInput = (e) => {
        const { name, value } = e.target;
        setInputValue({
        ...inputValue,
        [name]: value,
        });
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleError = (err) => toast.error(err, { position: 'bottom-left' });
    const handleSuccess = (msg) => toast.success(msg, { position: 'bottom-right' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:3000/login", { ...inputValue }, { withCredentials: true });

            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } 
        catch (error) {
            console.log(error);
        }

        setInputValue({
            ...inputValue,
            email: "",
            password: "",
        });
    };

    const handleGoogleAuth = async ({ code }) => {   
        try {
            const { data } = await axios.post("http://localhost:3000/google-auth", { code }, { withCredentials: true });
    
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: handleGoogleAuth,
        flow: 'auth-code',
      });

    return (
        <section className="container h-svh flex justify-center items-center overflow-hidden">
            <div className="w-5/6 h-fit grid grid-cols-2 gap-20 items-center p-4 pr-20 bg-gradient-to-br from-gray-900 to-neutral-900 rounded-2xl overflow-hidden">
                <div className="relative h-full rounded-xl overflow-hidden">
                    <img src="/images/oreto.png" alt="Oreto" className="aspect-[4/5] h-full w-full object-cover"/>
                    <h2 className="font-light text-3xl opacity-50 top-4 left-10 absolute origin-left rotate-90">Oreto <span className="text-xl font-extralight tracking-wide opacity-90 ml-2"> - your own AI assistant.</span></h2>
                </div>               

                <div className="flex flex-col gap-12 py-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="merriweather text-5xl leading-tight">Make life online <mark className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white">easier</mark>.</h1>
                        <p className="text-lg text-gray-300">Don&apos;t have an account? <Link to="/signup" className="underline text-indigo-300">Sign up</Link></p>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <form action="https://localhost:3000/login" method='POST' onSubmit={handleSubmit} className="w-full flex flex-col gap-12">
                            <div className="flex flex-col gap-6 text-base">
                                <input required type="email" name="email" value={email} placeholder="Email" onInput={handleOnInput} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                                <div className="relative">
                                    <input required type={showPassword ? "text" : "password"} name="password" value={password} placeholder="Password" onInput={handleOnInput} className="w-full bg-gray-800 p-4 pr-16 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                                    { showPassword 
                                        ?
                                        <VscEyeClosed onClick={handleShowPassword} className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size="1.5rem" />
                                        :
                                        <VscEye onClick={handleShowPassword} className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size="1.5rem" /> 
                                    }
                                </div>
                            </div>
                            <button type="submit" className="w-full p-4 rounded-md bg-indigo-600 shadow-lg font-semibold text-lg transition-all duration-200 hover:bg-indigo-700 hover:-translate-y-0.5">Log In</button>
                        </form>
                        <div className="w-full flex opacity-40 gap-4 items-center">
                            <hr className="flex-grow" />
                            <span className="text-sm tracking-wide">or login with</span>
                            <hr className="flex-grow" />
                        </div>
                        <button onClick={handleGoogleLogin} className="w-full flex gap-2 justify-center items-center p-4 rounded-md border border-gray-400 text-gray-200 shadow-lg font-medium text-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:text-white"><FaGoogle size="1.125rem"/>Google</button>
                    </div>
                </div>                
            </div>
            <ToastContainer />
        </section>
    );
}

export default Login;