import PropTypes from "prop-types";
import Masonry from "react-responsive-masonry";
import PromptHandler from "../PromptHandler";
import List from "./List";
import { CiCirclePlus } from "react-icons/ci";

const Lists = ({ lists, createList, deleteList, updateList }) => {
    return (
        <div className="h-full w-full py-8 pr-12 flex flex-col gap-12">
            <h2 className="relative w-fit merriweather font-light text-3xl leading-tight tracking-wide text-gray-300 before:absolute before:h-[1px] before:w-3/4 before:bg-gradient-to-r before:from-indigo-500 before:to-violet-500 before:-bottom-2">You have <mark className="bg-transparent text-white font-normal">{ lists.length || "no" } list{lists.length != 1 ? 's' : ''}</mark>{lists.length ? '' : " yet"}.</h2>
            
            <Masonry gutter="20px" columnsCount={3} className="max-h-full overflow-y-auto overflow-x-hidden pr-5">
                { lists.map((list) => <List key={list.id} list={list} deleteList={() => deleteList(list.id)} updateList={(newList) => updateList(list.id, newList)} />) }
            </Masonry>

            <div className="mt-auto"></div>
            <PromptHandler placeholder="Make a list of ..." additionalButtons={[<button key="add" onClick={createList}><CiCirclePlus className="stroke-1 text-gray-500 transition-all hover:text-indigo-400" size="1.5rem" /></button>]} />
        </div>
    );
}

Lists.propTypes = {
    lists: PropTypes.array.isRequired,
    createList: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    updateList: PropTypes.func.isRequired
}

export default Lists;