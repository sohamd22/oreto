import PropTypes from "prop-types";

const Reminder = ({ content, backgroundColor }) => {    
    return (
        <div className={`p-4 rounded-md flex ${backgroundColor} text-gray-200 font-medium`}>
            {content}
        </div>
    );
}

Reminder.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default Reminder;