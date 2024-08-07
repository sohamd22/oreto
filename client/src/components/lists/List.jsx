import { useState } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { MdDeleteOutline } from "react-icons/md";

const List = ({ list }) => {
    const [listName, setListName] = useState(list.name);
    list.name = listName;

    const { backgroundColor, items } = list;

    const deleteList = () => {
    }
    
    return (
        <div className={`relative ${backgroundColor} p-4 rounded-lg flex flex-col gap-4`}>
            <input type="text" value={listName} onInput={(event) => { setListName(event.target.value) }} className="font-medium text-xl underline bg-transparent focus:outline-none" />
            <ul className="flex flex-col gap-1">
                {   
                    items ? items.map((item, index) => <ListItem key={index} content={item} />) : null
                }
                <li className="cursor-pointer w-fit mt-2 opacity-90 leading-none text-sm">
                    + Add Item
                </li>
            </ul>

            <button onClick={deleteList} className="-mt-8 ml-auto w-fit bg-red-500 transition-colors duration-200 hover:bg-red-600 border-2 border-gray-900 p-1.5 rounded-full"><MdDeleteOutline size="1.25rem" /></button>
        </div>
    );
}

List.propTypes = {
    list: PropTypes.array.isRequired
}

export default List;