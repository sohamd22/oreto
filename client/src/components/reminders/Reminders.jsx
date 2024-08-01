import PromptInput from "../PromptInput";
import Reminder from "./Reminder";

const Reminders = () => {
    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">Your <mark className="bg-transparent text-white font-normal">reminders</mark> and <mark className="bg-transparent text-white font-normal">suggestions</mark>.</h2>

            <div className="flex flex-col max-h-full overflow-y-scroll overflow-x-hidden pr-5">
                
            </div>
            
            <div className="mt-auto"></div>
            <PromptInput placeholder="Help me with the reminder about ..." />
        </div>
    );
}

export default Reminders;