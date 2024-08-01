import axios from "axios";
import { useState } from "react";
import Response from "./Response";
import PromptInput from "../PromptInput";

const Chat = () => {
    const hourOfDay = (new Date()).getHours();
    const timeOfDay = hourOfDay < 12 ? "Morning" : (hourOfDay < 17 ? "Afternoon" : "Evening");

    const [response, setResponse] = useState('');

    const promptHandler = async (event, prompt, setPrompt) => {
        event.preventDefault();


        const response = await axios.post("http://localhost:3000/prompt", { prompt });
        const data = response.data;

        if (data) {
            setPrompt('');

            const textArea = document.querySelector("textarea");
            textArea.style.height = 'inherit';
            textArea.style.height = `${textArea.scrollHeight}px`;
            
            setResponse(data);
        }
    }

    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">Good {timeOfDay}, <mark className="bg-transparent text-white font-normal">Soham</mark>.</h2>

            <div className="mt-auto"></div>
            <Response content={response} />
            <PromptInput promptHandler={promptHandler} placeholder="Tell me about ..."/>
        </div>
    );
}

export default Chat;