import { MdThumbUp, MdThumbDown } from "react-icons/md";

const Response = (props) => {
    return (
        <div className="flex gap-5">
            <img src="/images/oreto-profile.png" alt="Oreto" className="aspect-square h-12 rounded-full border-2 border-gray-400" />
            <div className="flex flex-col gap-4 max-h-full overflow-y-scroll overflow-x-hidden pr-5">
                <p className="leading-relaxed text-gray-200 text-lg">
                    { props.content }
                </p>

                <div className="flex gap-4">
                    <button><MdThumbUp className="text-lime-500 transition-all hover:text-lime-600" size="1.25rem" /></button>
                    <button><MdThumbDown className="text-rose-500 transition-all hover:text-rose-600" size="1.25rem" /></button>
                </div>
            </div>                    
        </div>
    );
}

export default Response;