import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import Response from "./Response";
import PromptInput from "../PromptInput";
import Reminder from "./Reminder";
import List from "../lists/List";

const Chat = ({ activateTab, lists, setLists }) => {
    const hourOfDay = (new Date()).getHours();
    const timeOfDay = hourOfDay < 12 ? "Morning" : (hourOfDay < 17 ? "Afternoon" : "Evening");

    const [response, setResponse] = useState('');

    const functions = {
        activateTab: ({ tab }) => { activateTab(tab) },
        createList: ({name, items, backgroundColor}) => {
                backgroundColor = `bg-${backgroundColor}-600`;
                items = JSON.parse(items.replace('\\', ''));
                activateTab('lists');
                setLists([<List key={name} name={name} items={items} backgroundColor={backgroundColor} />, ...lists]);
            },
        displayResponse: ({ response }) => { setResponse(response) },
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
        else {
            setResponse("Sorry, there was an error.");
        }
    }

    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12 overflow-hidden">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">Good {timeOfDay}, <mark className="bg-transparent text-white font-normal">Soham</mark>.</h2>
            <div className="flex gap-4 w-full pb-5 overflow-y-hidden overflow-x-auto">
            </div>

            <div className="mt-auto"></div>
            <Response content={response} />
            <PromptInput promptHandler={promptHandler} placeholder="Tell me about ..."/>
        </div>
    );
}

Chat.propTypes = {
    activateTab: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    setLists: PropTypes.func.isRequired
}

export default Chat;