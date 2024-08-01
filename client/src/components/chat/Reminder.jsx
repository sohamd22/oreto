const Reminder = (props) => {
    return (
        <div className={`min-w-48 max-w-52 max-h-40 p-4 rounded-md flex ${props.backgroundColor} bg-opacity-50 text-gray-200`}>
            {props.content}
        </div>
    );
}

export default Reminder;