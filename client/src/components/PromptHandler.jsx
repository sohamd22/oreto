import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { MdSend } from "react-icons/md";

const PromptHandler = ({ functions, additionalButtons, placeholder }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post("http://localhost:3000/prompt", { prompt });
        const data = response.data;

        if (data) {
            setPrompt('');
            const textArea = document.querySelector("textarea");
            textArea.style.height = `${textArea.scrollHeight}px`;
            textArea.style.height = 'inherit';
            
            if (data.name) functions[data.name](data.args);
            functions.setResponse(data.response);
        }
        else {
            functions.setResponse("Sorry, there was an error.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-end gap-4 bg-gray-800 p-4 rounded-md border border-transparent focus:border-indigo-500">
            { additionalButtons }
            <textarea name="prompt" value={prompt} placeholder={placeholder} rows="1" className="resize-none w-full max-h-24 bg-gray-800 focus:outline-none" onInput={(event) => {setPrompt(event.target.value); event.target.style.height = 'inherit'; event.target.style.height = `${event.target.scrollHeight}px`;}} />
            <button type="submit">
                <MdSend className="cursor-pointer transition-all text-gray-500 hover:text-indigo-400" size="1.5rem" />
            </button>
        </form>
    );
}

PromptHandler.propTypes = {
    functions: PropTypes.func.isRequired,
    additionalButtons: PropTypes.array,
    placeholder: PropTypes.string.isRequired
}

export default PromptHandler;