import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async (event) => {
        event.preventDefault();

        const response = await axios.post("http://localhost:3000/users/login", {
            email,
            password
        });

        const data = response.data;

        console.log(data);
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
                        <p className="text-lg text-gray-300">Don&apos;t have an account? <a href="/signup" className="underline text-indigo-300">Sign up</a></p>
                    </div>

                    <form action="https://localhost:3000/users/login" method='POST' onSubmit={(event) => loginHandler(event)} className="flex flex-col gap-12">
                        <div className="flex flex-col gap-6 text-base">
                            <input required type="email" name="email" value={email} placeholder="Email" onInput={(e) => setEmail(e.target.value)} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                            <input required type="password" name="password" value={password} placeholder="Password" onInput={(e) => setPassword(e.target.value)} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                        </div>
                        <button type="submit" className="w-full p-4 rounded-md bg-indigo-600 shadow-lg font-semibold text-lg transition-all duration-200 hover:bg-indigo-700 hover:-translate-y-0.5">Log In</button>
                    </form>
                </div>                
            </div>
        </section>        
    );
}

export default Login;