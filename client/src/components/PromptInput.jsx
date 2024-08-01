import { useState } from "react";
import { MdSend } from "react-icons/md";

const PromptInput = (props) => {
    const [prompt, setPrompt] = useState('');

    return (
        <form onSubmit={(event) => {props.promptHandler(event, prompt, setPrompt)}} className="flex items-end gap-4 bg-gray-800 p-4 rounded-md border border-transparent focus:border-indigo-500">
            { props.additionalButtons }
            <textarea name="prompt" value={prompt} placeholder={props.placeholder} rows="1" className="resize-none w-full max-h-24 bg-gray-800 focus:outline-none" onInput={(event) => {setPrompt(event.target.value); event.target.style.height = 'inherit'; event.target.style.height = `${event.target.scrollHeight}px`;}} />
            <button type="submit">
                <MdSend className="cursor-pointer transition-all text-gray-500 hover:text-indigo-400" size="1.5rem" />
            </button>
        </form>
    );
}

export default PromptInput;