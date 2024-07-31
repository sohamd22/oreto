import Response from "./Response";
import PromptInput from "../PromptInput";

const Chat = () => {
    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">Good Evening, <mark className="bg-transparent text-white font-normal">Soham</mark>.</h2>
            
            <div className="mt-auto flex flex-col gap-8">
                <PromptInput placeholder="Tell me about ..." />
            </div>
        </div>
    );
}

export default Chat;