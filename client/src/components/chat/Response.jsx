import PropTypes from "prop-types";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

const Response = ({ content }) => {
    const displayRows = [];    
    if (content) {
        const lines = content.trim().split('\n');
        
        lines.forEach(line => {
            displayRows.push(<span>{line}<br /></span>);
        });
    }

    return (
        content
        ?
        <div className="max-h-full overflow-x-hidden flex gap-5">
            <img src="/images/oreto-profile.png" alt="Oreto" className="aspect-square h-12 rounded-full border-2 border-gray-400" />
            <div className="pr-5 overflow-y-auto w-full flex flex-col gap-2">
                <p className="leading-relaxed text-gray-200 text-lg">
                    { displayRows }
                </p>

                <div className="flex gap-4">
                    <button><MdThumbUp className="text-lime-500 opacity-50 transition-all hover:opacity-100" size="1.25rem" /></button>
                    <button><MdThumbDown className="text-rose-500 opacity-50 transition-all hover:opacity-100" size="1.25rem" /></button>
                </div>
            </div>                    
        </div>
        :
        <></>
    );
}

Response.propTypes = {
    content: PropTypes.string
}

export default Response;