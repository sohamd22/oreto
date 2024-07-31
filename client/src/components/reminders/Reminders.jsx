import PromptInput from "../PromptInput";

const Reminders = () => {
    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12">
            <div className="mt-auto flex flex-col gap-8">
                <PromptInput placeholder="Help me with the reminder about ..." />
            </div>
        </div>
    );
}

export default Reminders;