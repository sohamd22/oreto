const reminderColors = 
[
'bg-green-600',
'bg-lime-600', 
'bg-yellow-600',
'bg-blue-600',
'bg-rose-600', 
'bg-violet-600', 
'bg-indigo-600', 
'bg-cyan-600'
];

const saveReminder = async (reminder, user) => {
    reminder.backgroundColor = reminderColors[Math.floor(Math.random() * reminderColors.length)];
    user.data.reminders = [...user.data.reminders, reminder];
    await user.save();
    return { response: "I've saved that reminder for you!"}
}

export default saveReminder;