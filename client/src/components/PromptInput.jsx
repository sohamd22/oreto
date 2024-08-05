import { useState } from "react";
import PropTypes from "prop-types";
import { MdSend } from "react-icons/md";

const PromptInput = ({ promptHandler, additionalButtons, placeholder }) => {
    const [prompt, setPrompt] = useState('');

    return (
        <form onSubmit={(event) => {promptHandler(event, prompt, setPrompt)}} className="flex items-end gap-4 bg-gray-800 p-4 rounded-md border border-transparent focus:border-indigo-500">
            { additionalButtons }
            <textarea name="prompt" value={prompt} placeholder={placeholder} rows="1" className="resize-none w-full max-h-24 bg-gray-800 focus:outline-none" onInput={(event) => {setPrompt(event.target.value); event.target.style.height = 'inherit'; event.target.style.height = `${event.target.scrollHeight}px`;}} />
            <button type="submit">
                <MdSend className="cursor-pointer transition-all text-gray-500 hover:text-indigo-400" size="1.5rem" />
            </button>
        </form>
    );
}

PromptInput.propTypes = {
    promptHandler: PropTypes.func.isRequired,
    additionalButtons: PropTypes.array,
    placeholder: PropTypes.string.isRequired
}

export default PromptInput;