const activateTabFunctionDeclaration = {
    name: "activateTab",
    parameters: {
        type: "OBJECT",
        description: "Select a tab to activate.",
        properties: {
            tab: {
                type: "STRING",
                description: "Name of tab to activate: can be 'emails' (to work with emails) or 'lists' (to view lists).",
            },
        },
        required: ["tab"],
    },
};
  
const createListFunctionDeclaration = {
    name: "createList",
    parameters: {
        type: "OBJECT",
        description: "Creates a list with a name and items.",
        properties: {
            name: {
                type: "STRING",
                description: "Name of the list. If not specified, generate a relevant name.",
            },
            items: {
                type: "STRING",
                description: `A JSON String of string items in an array (e.g. ['item1', 'item2', 'item3']). 
                            Enhance/generate the items if asked.`
            },
            backgroundColor: {
                type: "STRING",
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
        type: "OBJECT",
        description: "Access the content of an implied http/https webpage link that you don't have info about.",
        properties: {
            link: {
                type: "STRING",
                description: "Link to the webpage that has to be accessed. Add http/https if required.",
            },
            prompt: {
                type: "STRING",
                description: "User's prompt unchanged."
            }
        },
        required: ["link", "prompt"],
    },
};

const handleEmailFunctionDeclaration = {
    name: "handleEmail",
    parameters: {
        type: "OBJECT",
        description: "Handles an email by improving the subject, extracting dates, and categorizing it when asked to.",
        properties: {
            subject: {
                type: "STRING",
                description: "Improved email subject using information from the email."
            },
            datetimeInfo: {
                type: "STRING",
                description: `JSON String with an array of objects with important datetimes, types, and names in the email.
                              (for eg. [{type: 'deadline', name: 'rent payment', datetime:'04/08/2024 12:30PM MST'}]).`
            },
            category: {
                type: "STRING",
                description: "Name of category to classify email into: can be 'work', 'financial', 'personal', 'social', 'promo'."
            }
        },
        required: ["subject", "category"],
    }
};
  
const saveMemoriesFunctionDeclaration = {
    name: "saveMemories",
    parameters: {
        type: "OBJECT",
        description: "Extracts content to be saved as memories to help with personalization, recommendations, and direct requests.",
        properties: {
        memories: {
            type: "STRING",
            description: "Content to be saved as memory.",
        },
        },
        required: ["memories"],
    }
};

export default [ activateTabFunctionDeclaration, createListFunctionDeclaration, accessWebContentFunctionDeclaration, handleEmailFunctionDeclaration ];