import { useState } from "react"; 
import PropTypes from "prop-types";

const ListItem = ({ content }) => {
    const [value, setValue] = useState(content);

    const checkboxHandler = (event) => {
        const listItem = event.target.parentNode;
        if (event.target.checked) {
            listItem.classList.add("line-through");
            listItem.classList.add("opacity-80");
        }
        else {
            listItem.classList.remove("line-through");
            listItem.classList.remove("opacity-80");
        }
    }

    return (
        <li className="flex gap-2">
            <input type="checkbox" className="cursor-pointer" onClick={(event) => {checkboxHandler(event)}} />
            <input type="text" value={value} onInput={(event) => { setValue(event.target.value) }} className="bg-transparent focus:outline-none" />
        </li>
    );
}

ListItem.propTypes = {
    content: PropTypes.string
}

export default ListItem;