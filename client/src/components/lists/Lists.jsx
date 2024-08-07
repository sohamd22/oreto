import PropTypes from "prop-types";
import Masonry from "react-responsive-masonry";
import PromptInput from "../PromptInput";
import List from "./List";
import { CiCirclePlus } from "react-icons/ci";

const Lists = ({ lists, setLists }) => {
    const createList = ({name, items, backgroundColor}) => {
        backgroundColor = `bg-${backgroundColor}-600`;
        items = JSON.parse(items.replace('\\', ''));
        setLists([{name, items, backgroundColor}, ...lists]);
    }

    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">You have <mark className="bg-transparent text-white font-normal">{ lists.length || "no" } list{lists.length != 1 ? 's' : ''}</mark>{lists.length ? '' : " yet"}.</h2>
            
            <Masonry gutter="20px" columnsCount={3} className="max-h-full overflow-y-auto overflow-x-hidden pr-5">
                { lists.map((list) => <List key={list.name} list={list} />) }
            </Masonry>

            <div className="mt-auto"></div>
            <PromptInput placeholder="Make a list of ..." additionalButtons={[<button key="add"><CiCirclePlus className="stroke-1 text-gray-500 transition-all hover:text-indigo-400" size="1.5rem" /></button>]} />
        </div>
    );
}

Lists.propTypes = {
    lists: PropTypes.array.isRequired,
    setLists: PropTypes.func.isRequired
}

export default Lists;