import { FunctionDeclarationSchemaType } from "@google/generative-ai";

const activateTabFunctionDeclaration = {
    name: "activateTab",
    parameters: {
        type: FunctionDeclarationSchemaType.OBJECT,
        description: "Select a tab to activate.",
        properties: {
            tab: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "Name of tab to activate: can be 'emails' (to work with emails), 'lists' (to view lists), or 'chat' (for general chat).",
            },
        },
        required: ["tab"],
    },
};

const createListFunctionDeclaration = {
    name: "createList",
    parameters: {
        type: FunctionDeclarationSchemaType.OBJECT,
        description: "Create a list name and items.",
        properties: {
            name: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "Name of the list. If not specified, generate a relevant name.",
            },
            items: {
                type: FunctionDeclarationSchemaType.ARRAY,
                description: `Array of string list items. Enhance/generate the items if asked.`,
                items: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "A list item."
                }
            },
            backgroundColor: {
                type: FunctionDeclarationSchemaType.STRING,
                description: `Relevant color based on list name/items (e.g. green for Grocery). 
                            Can be 'green', 'lime', 'yellow', 'blue', 'rose', 'violet', 'indigo', 'cyan'. 
                            If no obvious relevant color, pick one randomly. If user specifies a color, pick 
                            the closest option.`
            }
        },
        required: ["name", "items", "backgroundColor"],
    },
};

const accessWebContentFunctionDeclaration = {
    name: "accessWebContent",
    parameters: {
        type: FunctionDeclarationSchemaType.OBJECT,
        description: "Access content of an implied http/https webpage link that you don't have info about.",
        properties: {
            link: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "Link to the webpage that has to be accessed. Add http/https if required.",
            },
            prompt: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "User's prompt unchanged."
            }
        },
        required: ["link", "prompt"],
    },
};

const handleEmailFunctionDeclaration = {
    name: "handleEmail",
    parameters: {
        type: FunctionDeclarationSchemaType.OBJECT,
        description: "Handle an email by extracting important dates (Due dates, Event dates, Reminder dates. NOT EMAIL SEND DATES OR OTHER UNIMPORTANT DATES) from it and categorizing it.",
        properties: {
            datetimeInfo: {
                type: FunctionDeclarationSchemaType.ARRAY,
                description: `Array of objects containing important datetimes in the email and descriptions for them.`,
                items: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        description: {
                            type: FunctionDeclarationSchemaType.STRING,
                            description: "Detailed description of the context of the datetime in the email (for eg. 'The monthly rent for ABC Apartments is due on', 'The <name> sports event at ABC Location is on', 'Finish <task> for work by', etc.)."
                        },
                        datetime: {
                            type: FunctionDeclarationSchemaType.STRING,
                            description: "Datetime info (for eg. '14/08/2024 12:30PM MST')"
                        }
                    }
                }
            },
            category: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "Name of category to classify email into: can be 'work', 'financial', 'personal', 'social', and 'promo' (for promotions/newsletters)."
            }
        },
        required: ["category"],
    }
};
  
const saveReminderFunctionDeclaration = {
    name: "saveReminder",
    parameters: {
        type: FunctionDeclarationSchemaType.OBJECT,
        description: "Saves a reminder with the given date and/or time.",
        properties: {
            reminder: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "The reminder.",
            },
            datetime: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "Date to give the reminder (for eg. '14/08/2024 12:30PM MST', '07/09/2024', etc.)"
            }
        },
        required: ["reminder", "datetime"],
    }
};

const displayResponseFunctionDeclaration = {
    name: "displayResponse",
    parameters: {
        type: FunctionDeclarationSchemaType.OBJECT,
        description: "Displays a response to the user.",
        properties: {
            response: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "The response to show the user.",
            },
        },
        required: ["response"],
    }
}

export default [ activateTabFunctionDeclaration, createListFunctionDeclaration, accessWebContentFunctionDeclaration, handleEmailFunctionDeclaration, saveReminderFunctionDeclaration, displayResponseFunctionDeclaration ];