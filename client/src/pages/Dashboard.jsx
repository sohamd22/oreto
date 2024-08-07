import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { PiChatTeardropTextFill, PiListDashesFill } from "react-icons/pi";
import { MdEmail, MdLogout } from "react-icons/md";

import Chat from "../components/chat/Chat";
import Emails from "../components/emails/Emails";
import Lists from "../components/lists/Lists";

const Dashboard = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [user, setUser] = useState({});

    const [response, setResponse] = useState('');

    const [lists, setLists] = useState([]);
    const listColors = ['green', 'lime', 'yellow', 'blue', 'rose', 'violet', 'indigo', 'cyan'];

    const [activeTab, setActiveTab] = useState("chat");

    const activateTab = (tab) => {
        const selectedTabIcon = document.querySelector(`[data-key="${tab}"]`);
        const tabIcons = Array.from(document.getElementById("tabs").children);

        tabIcons.forEach(icon => {
            icon.classList.remove("text-indigo-300");
            icon.classList.add("text-gray-600");
        });

        selectedTabIcon.classList.remove("text-gray-600");
        selectedTabIcon.classList.add("text-indigo-300");
        setActiveTab(tab);
    }

    const functions = {
        activateTab: ({ tab }) => activateTab(tab),

        createList: async ({name="My List", items="[]", backgroundColor}) => {
            if (!backgroundColor) {
                backgroundColor = listColors[Math.floor(Math.random() * listColors.length)];
                console.log(backgroundColor);
            }
            backgroundColor = `bg-${backgroundColor}-600`;
            items = JSON.parse(items);
            const listsUpdated = [{name, items, backgroundColor}, ...lists];
            setLists(listsUpdated);
            activateTab("lists");
            await axios.post("http://localhost:3000/lists/save", { lists: listsUpdated, email: user.email });
        },
            
        setResponse,
    }

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            const { data } = await axios.post("http://localhost:3000", {}, { withCredentials: true });
            const { status, user } = data;
            
            return status ? (setUser(user), setLists(user.lists)) : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        googleLogout();
        removeCookie("token");
        navigate("/login");
    };

    
    
    const tabComponents = {
        "chat": <Chat name={user?.name?.split(' ')[0] || ''} response={response} functions={functions} />,
        "emails": <Emails />,
        "lists": <Lists lists={lists} createList={functions.createList} />,
    }

    return (
        <section className="container h-svh flex justify-center items-center overflow-hidden">
            <div className="w-5/6 min-h-fit h-3/4 flex gap-12 items-center bg-gradient-to-br from-gray-900 to-neutral-900 rounded-2xl overflow-hidden">
                <div className="h-full py-8 px-4 flex flex-col justify-between bg-gray-800">
                    <div id="tabs" className="flex flex-col gap-8">
                        <PiChatTeardropTextFill data-key="chat" onClick={() => activateTab("chat")} className="cursor-pointer h-auto text-indigo-300" size="1.5rem" />
                        <MdEmail data-key="emails" onClick={() => activateTab("emails")} className="cursor-pointer h-auto text-gray-600" size="1.5rem" />
                        <PiListDashesFill data-key="lists" onClick={() => activateTab("lists")} className="cursor-pointer h-auto text-gray-600" size="1.5rem" />
                    </div>
                    <div>
                        <button onClick={Logout}><MdLogout className="cursor-pointer h-auto text-red-500" size="1.5rem" /></button>
                    </div>
                </div>        
                
                { tabComponents[activeTab] }
            </div>
        </section>
    );
}

export default Dashboard;