import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import { FaGoogle } from "react-icons/fa";

const Signup = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyCookie = async () => {
            if (cookies.token) {
                navigate("/");
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
    
    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { name, email, password } = inputValue;
    const handleOnInput = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) => console.error(err);
    const handleSuccess = (msg) => console.log(msg);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:3000/signup", { ...inputValue }, { withCredentials: true });

            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } 
            else {
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
            name: "",
        });
    }

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
                        <p className="text-lg text-gray-300">Already have an account? <Link to="/login" className="underline text-indigo-300">Log in</Link></p>
                    </div>

                    <form action="https://localhost:3000/signup" method='POST' onSubmit={handleSubmit} className="flex flex-col gap-12">
                        <div className="flex flex-col gap-6 text-base">
                            <input required name="name" type="text" value={name} placeholder="Full Name" onInput={handleOnInput} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                            <input required type="email" name="email" value={email} placeholder="Email" onInput={handleOnInput} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                            <input required type="password" name="password" value={password} placeholder="Password" onInput={handleOnInput} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <button type="submit" className="w-full p-4 rounded-md bg-indigo-600 shadow-lg font-semibold text-lg transition-all duration-200 hover:bg-indigo-700 hover:-translate-y-0.5">Create Account</button>
                            <div className="flex opacity-40 gap-4 items-center">
                                <hr className="flex-grow" />
                                <span className="text-sm tracking-wide">or register with</span>
                                <hr className="flex-grow" />
                            </div>
                            <button type="submit" className="flex justify-center items-center gap-4 w-full p-4 rounded-md border border-gray-400 shadow-lg font-medium text-lg transition-all duration-200 hover:-translate-y-0.5"><FaGoogle /> Google</button>
                        </div>
                        
                    </form>
                </div>                
            </div>
        </section>        
    );
}

export default Signup;