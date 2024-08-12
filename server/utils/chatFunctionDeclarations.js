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
        description: "Handle an email by improving the subject, extracting dates, and categorizing it.",
        properties: {
            subject: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "Improved email subject using information from the email."
            },
            datetimeInfo: {
                type: FunctionDeclarationSchemaType.ARRAY,
                description: `Array of objects containing only important datetimes in the email with their labels.`,
                items: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        label: {
                            type: FunctionDeclarationSchemaType.STRING,
                            description: "Label for the datetime (for eg. 'Rent Due Date' or 'Event Date')"
                        },
                        datetime: {
                            type: FunctionDeclarationSchemaType.STRING,
                            description: "Datetime info (for eg. '04/08/2024 12:30PM MST'"
                        }
                    }
                }
            },
            category: {
                type: FunctionDeclarationSchemaType.STRING,
                description: "Name of category to classify email into: can be 'work', 'financial', 'personal', 'social', and 'promo' (for promotions/newsletters)."
            }
        },
        required: ["subject", "category"],
    }
};
  
const saveMemoriesFunctionDeclaration = {
    name: "saveMemories",
    parameters: {
        type: FunctionDeclarationSchemaType.OBJECT,
        description: "Extracts content to be saved as memories to help with personalization, recommendations, and direct requests.",
        properties: {
        memories: {
            type: FunctionDeclarationSchemaType.STRING,
            description: "Content to be saved as memory.",
        },
        },
        required: ["memories"],
    }
};

export default [ activateTabFunctionDeclaration, createListFunctionDeclaration, accessWebContentFunctionDeclaration, handleEmailFunctionDeclaration ];