import PropTypes from "prop-types";

const Email = ({ sender, subject, tags, datetime}) => {
    return (
        <div className="w-full flex justify-between px-6 py-4 rounded-md bg-gray-800 border border-l-0 border-r-0 border-gray-700">
            <div className="flex">
                <h3 className="w-40 font-bold">{ sender }</h3>
                <p>{ subject }</p>
            </div>
            <div className="flex items-center gap-4">
                { tags }
                <h3 className="font-bold w-16 text-right">{ datetime  }</h3>
            </div>            
        </div>
    );
}

Email.propTypes = {
    sender: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    tags: PropTypes.array,
    datetime: PropTypes.string.isRequired
}

export default Email;