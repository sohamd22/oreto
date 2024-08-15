import { useState } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { MdDeleteOutline } from "react-icons/md";

const List = ({ list, deleteList, updateList }) => {
    const [listName, setListName] = useState(list.name);
    const [listItems, setListItems] = useState(list.items);
    const { backgroundColor } = list;

    const addListItem = () => {
        const listItemsUpdated = [...listItems, "New list item."];
        setListItems(listItemsUpdated);
        list.items = listItemsUpdated;
        updateList(list);
    }

    const removeListItem = (index) => {
        const listItemsUpdated = listItems.filter((_, i) => i != index);
        setListItems(listItemsUpdated);
        list.items = listItemsUpdated;
        updateList(list);
    }
    
    return (
        <div className={`relative ${backgroundColor} p-4 rounded-lg flex flex-col gap-4`}>
            <input type="text" value={listName} onInput={(event) => { setListName(event.target.value); list.name = event.target.value; updateList(list) }} className="font-medium text-xl underline bg-transparent focus:outline-none" />
            <ul className="flex flex-col gap-1">
                {   
                    listItems ? listItems.map((item, index) => <ListItem key={index} value={item} setValue={(newValue) => {
                            const listItemsUpdated = [...listItems];
                            listItemsUpdated[index] = newValue;
                            setListItems(listItemsUpdated);
                            list.items = listItemsUpdated;
                            updateList(list);
                        }} removeItem={() => removeListItem(index)} />) : null
                }
                <button onClick={addListItem} className="w-fit mt-2 opacity-90 leading-none text-sm">
                    + Add Item
                </button>
            </ul>

            <button onClick={deleteList} className="-mt-8 ml-auto w-fit bg-red-500 transition-colors duration-200 hover:bg-red-600 border-2 border-gray-900 p-1.5 rounded-full"><MdDeleteOutline size="1.25rem" /></button>
        </div>
    );
}

List.propTypes = {
    list: PropTypes.object.isRequired,
    deleteList: PropTypes.func.isRequired,
    updateList: PropTypes.func.isRequired
}

export default List;