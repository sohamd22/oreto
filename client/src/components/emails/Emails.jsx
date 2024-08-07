import { useState } from "react";
import PromptHandler from "../PromptHandler";
import Email from "./Email";

const Emails = () => {
    const emails = {
        "work": [
            <Email key="1" sender="Soham Daga" subject="You need to finish the email section by TODAY." datetime="1:52 PM" tags={[<h3 key="deadline" className="font-bold text-sm px-2 py-1 bg-red-600 rounded-md">Due Today</h3>]}  />,
            <Email key="2" sender="Deepa Atal" subject="You need to add some sections to the form." datetime="27 Jul" tags={[<h3 key="deadline" className="font-bold text-sm px-2 py-1 bg-yellow-600 rounded-md">Due Tomorrow</h3>]} />
        ],
        "personal": [],
        "financial": [],
        "promo": []

    }

    const [activeTab, setActiveTab] = useState('work');

    const activateTab = (event) => {
        const selectedTab = event.currentTarget;
        const tabs = Array.from(selectedTab.parentNode.children);

        tabs.forEach(tab => {
            tab.classList.add("opacity-40");
            tab.classList.remove("border-l-2");
        });

        selectedTab.classList.remove("opacity-40");
        selectedTab.classList.add("border-l-2")
        setActiveTab(selectedTab.dataset.key);
    }

    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">Your <mark className="bg-transparent text-white font-normal">sorted emails</mark> this week.</h2>
            
            <div className="flex gap-4">
                <button data-key="work" onClick={(event) => activateTab(event)} className="px-5 py-2 bg-blue-600 rounded-md border-l-2">Work</button>
                <button data-key="personal" onClick={(event) => activateTab(event)} className="px-5 py-2 bg-rose-600 rounded-md opacity-40">Personal</button>
                <button data-key="financial" onClick={(event) => activateTab(event)} className="px-5 py-2 bg-green-600 rounded-md opacity-40">Financial</button>
                <button data-key="promo" onClick={(event) => activateTab(event)} className="px-5 py-2 bg-yellow-600 rounded-md opacity-40">Promo/News</button>
            </div>

            <div className="flex flex-col max-h-full overflow-y-auto overflow-x-hidden pr-5">
                { emails[activeTab] }
            </div>
            
            <div className="mt-auto"></div>
            <PromptHandler placeholder="Sort my emails by ..." />
        </div>
    );
}

// Work
// Personal
// Financial
// Promotions/Newsletters
// Each one can have a deadline tag, action required tag, reference tag

export default Emails;