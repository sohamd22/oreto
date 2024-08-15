import PropTypes from "prop-types";

const ListItem = ({ value, setValue, removeItem }) => {
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
            <button onClick={removeItem} className="w-fit mt-2 opacity-90 leading-none text-xs">
                x
            </button>
        </li>
    );
}

ListItem.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
}

export default ListItem;