import { useState } from "react";
import PromptHandler from "../PromptHandler";
import Email from "./Email";
import PropTypes from "prop-types";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Emails = ({ emails, functions }) => {
    const [activeEmailTab, setactiveEmailTab] = useState('work');

    const activateEmailTab = (event) => {
        const selectedTab = event.currentTarget;
        const tabs = Array.from(selectedTab.parentNode.children);

        tabs.forEach(tab => {
            tab.classList.add("opacity-40");
            tab.classList.remove("border-l-2");
        });

        selectedTab.classList.remove("opacity-40");
        selectedTab.classList.add("border-l-2")
        setactiveEmailTab(selectedTab.dataset.key);
    }

    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">Your <mark className="bg-transparent text-white font-normal">categorized emails</mark>.</h2>
            
            <div className="flex gap-4">
                <button data-key="work" onClick={(event) => activateEmailTab(event)} className="px-5 py-2 bg-blue-600 rounded-md border-l-2">Work</button>
                <button data-key="financial" onClick={(event) => activateEmailTab(event)} className="px-5 py-2 bg-green-600 rounded-md opacity-40">Financial</button>
                <button data-key="personal" onClick={(event) => activateEmailTab(event)} className="px-5 py-2 bg-purple-600 rounded-md opacity-40">Personal</button>
                <button data-key="social" onClick={(event) => activateEmailTab(event)} className="px-5 py-2 bg-rose-600 rounded-md opacity-40">Social</button>
                <button data-key="promo" onClick={(event) => activateEmailTab(event)} className="px-5 py-2 bg-yellow-600 rounded-md opacity-40">Promo/News</button>
            </div>

            <div className="flex flex-col max-h-full overflow-y-auto overflow-x-hidden pr-5">
                { emails[activeEmailTab].map(email => {
                    const date = new Date(email.datetime);
                    const currentDate = new Date();
                    let dateText;
                    
                    if (Math.floor((currentDate - date)/1000) <= (currentDate.getHours() * 3600 + currentDate.getMinutes() * 60 + currentDate.getSeconds())) {
                        dateText = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
                    }
                    else {
                        dateText = `${String(date.getDate()).padStart(2, "0")} ${months[date.getMonth()]}`;
                    }
                    return <Email key={email.id} sender={email.sender.split(' <')[0]} subject={email.subject} datetime={dateText} />
                  }) }
            </div>
            
            <div className="mt-auto"></div>
            <PromptHandler functions={functions} placeholder="Help me with the email about..." />
        </div>
    );
}

Emails.propTypes = {
    emails: PropTypes.object.isRequired,
    functions: PropTypes.object.isRequired,
}

export default Emails;