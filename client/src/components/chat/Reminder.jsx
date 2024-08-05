import PropTypes from "prop-types";

const Reminder = ({ backgroundColor, content }) => {
    return (
        <div className={`min-w-48 max-w-52 max-h-40 p-4 rounded-md flex ${backgroundColor} bg-opacity-50 text-gray-200`}>
            {content}
        </div>
    );
}

Reminder.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default Reminder;