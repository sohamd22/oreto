import axios from "axios";
import PropTypes from "prop-types";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

const Response = ({ response, setResponse }) => {
    const displayRows = [];    
    if (response.text) {
        const lines = response.text.trim().split('\n');
        
        lines.forEach(line => {
            displayRows.push(<span>{line}<br /></span>);
        });
    }

    const sendFeedback = async (feedback) => {
        setResponse({...response, feedbackGiven: true});

        const feedbackResponse = await axios.post("http://localhost:3000/chat", { prompt: feedback });
        const data = feedbackResponse.data;

        if (data) {
            console.log(data);
        }
    }

    return (
        response.text
        ?
        <div className="h-full overflow-x-hidden flex gap-5">
            <img src="/images/oreto-profile.png" alt="Oreto" className="aspect-square h-12 rounded-full border-2 border-gray-400" />
            <div className="pr-5 overflow-y-auto w-full flex flex-col gap-2">
                <p className="leading-relaxed text-gray-200 text-lg">
                    { displayRows }
                </p>

                <div className="flex gap-4">
                    <button className={`${response.feedbackGiven ? "hidden" : ""} opacity-50 transition-all hover:opacity-100`} onClick={(event) => sendFeedback(event, "~~The user liked this response.")}><MdThumbUp className="pointer-events-none text-lime-500" size="1.25rem" /></button>
                    <button className={`${response.feedbackGiven ? "hidden" : ""} opacity-50 transition-all hover:opacity-100`} onClick={(event) => sendFeedback(event, "~~The user did not like this response.")}><MdThumbDown className="pointer-events-none text-rose-500" size="1.25rem" /></button>
                    <p className={`${response.feedbackGiven ? "" : "hidden"} text-xs opacity-50`}>I will keep that feedback in mind.</p>
                </div>
            </div>                    
        </div>
        :
        <></>
    );
}

Response.propTypes = {
    response: PropTypes.object,
    setResponse: PropTypes.func,
}

export default Response;