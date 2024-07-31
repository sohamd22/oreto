const Reminder = (props) => {
    return (
        <div className="w-full flex justify-between px-6 py-4 rounded-md bg-gray-800 border border-l-0 border-r-0 border-gray-700">
            <div className="flex">
                <h3 className="w-40 font-bold">{ props.sender }</h3>
                <p>{ props.subject }</p>
            </div>
            <div className="flex items-center gap-4">
                { props.tags }
                <h3 className="font-bold w-16 text-right">{ props.datetime  }</h3>
            </div>            
        </div>
    );
}

export default Reminder;