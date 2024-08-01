import { MdThumbUp, MdThumbDown } from "react-icons/md";

const Response = (props) => {
    const displayRows = [];    
    if (props.content) {
        const lines = props.content.trim().split('\n');
        
        lines.forEach(line => {
            displayRows.push(<span>{line}<br /></span>);
        });
    }

    return (
        props.content
        ?
        <div className="mt-auto max-h-full overflow-x-hidden pr-5 flex gap-5">
            <img src="/images/oreto-profile.png" alt="Oreto" className="aspect-square h-12 rounded-full border-2 border-gray-400" />
            <div className="overflow-y-scroll w-full flex flex-col gap-2">
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
        <div className="mt-auto"></div>
    );
}

export default Response;