import axios from "axios";
import { useState } from "react";
import Response from "./Response";
import PromptInput from "../PromptInput";
import Reminder from "./Reminder";

const Chat = (props) => {
    const hourOfDay = (new Date()).getHours();
    const timeOfDay = hourOfDay < 12 ? "Morning" : (hourOfDay < 17 ? "Afternoon" : "Evening");

    const [response, setResponse] = useState('');

    const functions = {
        activateTab: ({ tab }) => { props.activateTab(tab) },
        default: ({ response }) => { setResponse(response) },
    }

    const promptHandler = async (event, prompt, setPrompt) => {
        event.preventDefault();

        const response = await axios.post("http://localhost:3000/prompt", { prompt });
        const data = response.data;

        if (data) {
            setPrompt('');
            const textArea = document.querySelector("textarea");
            textArea.style.height = `${textArea.scrollHeight}px`;
            textArea.style.height = 'inherit';

            functions[data.name](data.args);
        }
    }

    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12 overflow-hidden">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">Good {timeOfDay}, <mark className="bg-transparent text-white font-normal">Soham</mark>.</h2>
            <div className="flex gap-4 w-full pb-5 overflow-y-hidden overflow-x-auto">
                {/* <Reminder content="Your reminder to always be nice to people regardless of anything." backgroundColor="bg-lime-500" />
                <Reminder content="Your reminder to finish the work assigned to you by tuesday evening." backgroundColor="bg-rose-500" />
                <Reminder content="Your reminder to finish Deepa Masi's forms by tomorrow." backgroundColor="bg-purple-500" />
                <Reminder content="Your reminder to not give up on this project." backgroundColor="bg-blue-500" />
                <Reminder content="Your reminder to always stay awesome." backgroundColor="bg-yellow-500" />
                <Reminder content="Your reminder to sleep on time tonight." backgroundColor="bg-teal-500" /> */}
            </div>

            <div className="mt-auto"></div>
            <Response content={response} />
            <PromptInput promptHandler={promptHandler} placeholder="Tell me about ..."/>
        </div>
    );
}

export default Chat;