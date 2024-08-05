import { useState } from "react";
import ListItem from "./ListItem";
import { MdDeleteOutline } from "react-icons/md";

const List = (props) => {
    const [name, setName] = useState(props.name);
    
    return (
        <div className={`relative ${props.backgroundColor} p-4 rounded-lg flex flex-col gap-4`}>
            <input type="text" value={name} onInput={(event) => { setName(event.target.value) }} className="font-medium text-xl underline bg-transparent focus:outline-none" />
            <ul className="flex flex-col gap-1">
                {   
                    props.items ? props.items.map(item => <ListItem key={item} content={item} />) : null
                }
                <li className="cursor-pointer w-fit mt-2 opacity-90 leading-none text-sm">
                    + Add Item
                </li>
            </ul>

            <button className="-mt-8 ml-auto w-fit bg-red-500 transition-colors duration-200 hover:bg-red-600 border-2 border-gray-900 p-1.5 rounded-full"><MdDeleteOutline size="1.25rem" /></button>
        </div>
    );
}

export default List;