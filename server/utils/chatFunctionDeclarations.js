import { FunctionDeclarationSchemaType } from "@google/generative-ai";

const activateTabFunctionDeclaration = {
    name: "activateTab",
    parameters: {
        type: FunctionDeclarationSchemaType.OBJECT,
        description: "Select a tab to activate.",
        properties: {
            tab: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "Name of tab to activate: can be 'emails' (to work with emails) or 'lists' (to view lists).",
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
        description: "Handle an email by extracting dates from it and categorizing it.",
        properties: {
            datetimeInfo: {
                type: FunctionDeclarationSchemaType.ARRAY,
                description: `Array of objects containing important datetimes in the email with their labels.`,
                items: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        label: {
                            type: FunctionDeclarationSchemaType.STRING,
                            description: "Descriptive label for the datetime (for eg. 'The rent for ABC Apartments is due on', 'The <name> event at ABC Location is on', 'Finish <task> by', etc.)"
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
        required: ["reminder", "date"],
    }
};

export default [ activateTabFunctionDeclaration, createListFunctionDeclaration, accessWebContentFunctionDeclaration, handleEmailFunctionDeclaration, saveReminderFunctionDeclaration ];