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

    const reminders = [...user.data.reminders, reminder];
    reminders.sort((a, b) => {
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
    });

    user.data.reminders = reminders;
      
    await user.save();
    return { response: "I've saved that reminder for you!" }
}

export default saveReminder;