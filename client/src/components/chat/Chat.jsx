import PropTypes from "prop-types";
import Response from "./Response";
import Reminder from "./Reminder";
import PromptHandler from "../PromptHandler";

const Chat = ({ name, response, reminders, functions }) => {
    const hourOfDay = (new Date()).getHours();
    const timeOfDay = hourOfDay < 12 ? "Morning" : (hourOfDay < 17 ? "Afternoon" : "Evening");

    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12 overflow-hidden">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">Good {timeOfDay}, <mark className="bg-transparent text-white font-normal">{ name }</mark>.</h2>
            <div className="flex gap-4 w-full pb-5 overflow-y-hidden overflow-x-auto">
                {
                    reminders.map(reminder => <Reminder key={reminder.reminder} content={`${reminder.reminder}: ${reminder.datetime}`} />)
                }
            </div>

            <div className="mt-auto"></div>
            <Response response={response} setResponse={functions.setResponse} />
            <PromptHandler functions={functions} placeholder="Tell me about ..."/>
        </div>
    );
}

Chat.propTypes = {
    name: PropTypes.string.isRequired,
    response: PropTypes.string.isRequired,
    reminders: PropTypes.array.isRequired,
    functions: PropTypes.object.isRequired,
}

export default Chat;