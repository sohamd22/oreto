import PropTypes from "prop-types";

const reminderColors = ['green', 'lime', 'yellow', 'blue', 'rose', 'violet', 'indigo', 'cyan'];

const Reminder = ({ content }) => {
    const backgroundColor = `bg-${reminderColors[Math.floor(Math.random() * reminderColors.length)]}-600`;
    
    return (
        <div className={`min-w-48 max-w-52 max-h-40 p-4 rounded-md flex ${backgroundColor} text-gray-200 font-medium`}>
            {content}
        </div>
    );
}

Reminder.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default Reminder;