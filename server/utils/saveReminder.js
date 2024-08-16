const saveReminder = async (reminder, user) => {
    user.data.reminders = [...user.data.reminders, reminder];
    await user.save();
    return { response: "I've saved that reminder for you!"}
}

export default saveReminder;