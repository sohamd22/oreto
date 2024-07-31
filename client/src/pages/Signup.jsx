import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler = async (event) => {
        event.preventDefault();

        const response = await axios.post("http://localhost:3000/users/signup", {
            firstName,
            lastName,
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
                        <p className="text-lg text-gray-300">Already have an account? <a href="/login" className="underline text-indigo-300">Log in</a></p>
                    </div>

                    <form action="https://localhost:3000/users/signup" method='POST' onSubmit={(event) => signupHandler(event)} className="flex flex-col gap-12">
                        <div className="flex flex-col gap-6 text-base">
                            <div className="grid grid-cols-2 gap-6">
                                <input required name="firstName" type="text" value={firstName} placeholder="First Name" onInput={(e) => setFirstName(e.target.value)} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                                <input required name="firstName" type="text" value={lastName} placeholder="Last Name" onInput={(e) => setLastName(e.target.value)} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                            </div>
                            <input required type="email" name="email" value={email} placeholder="Email" onInput={(e) => setEmail(e.target.value)} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                            <input required type="password" name="password" value={password} placeholder="Password" onInput={(e) => setPassword(e.target.value)} className="bg-gray-800 p-4 rounded-md focus:outline-none border border-transparent focus:border-indigo-500" />
                        </div>
                        <button type="submit" className="w-full p-4 rounded-md bg-indigo-600 shadow-lg font-semibold text-lg transition-all duration-200 hover:bg-indigo-700 hover:-translate-y-0.5">Create Account</button>
                    </form>
                </div>                
            </div>
        </section>        
    );
}

export default Signup;