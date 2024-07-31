import { useState } from "react"; 

const ListItem = (props) => {
    const [content, setContent] = useState(props.content);

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
            <input type="text" value={content} onInput={(event) => { setContent(event.target.value) }} className="bg-transparent focus:outline-none" />
        </li>
    );
}

export default ListItem;