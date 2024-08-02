// Gemini Model Initialization
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// Function Calling
const activateTabFunctionDeclaration = {
  name: "activateTab",
  parameters: {
    type: "OBJECT",
    description: "Select a tab to activate.",
    properties: {
      tab: {
        type: "STRING",
        description: "Name of the tab to activate which can be `emails` to work with emails, `lists` to work with lists (only if they are todo lists), or `saved` to worked with saved bookmarks and other saved data.",
      },
    },
    required: ["tab"],
  },
};

const defaultFunctionDeclaration = {
  name: "default",
  parameters: {
    type: "OBJECT",
    description: "Give a response to the user's prompt.",
    properties: {
      response: {
        type: "STRING",
        description: "Your response to the user's prompt as an AI assistant named Oreto.",
      },
    },
    required: ["response"],
  },
}

const generativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",

  tools: {
    functionDeclarations: [activateTabFunctionDeclaration, defaultFunctionDeclaration],
  },
});

const chat = generativeModel.startChat();

const responseHandler = async (prompt) => {
    const result = await chat.sendMessage(prompt);

    const call = result.response.functionCalls() ? result.response.functionCalls()[0] : null;

    if (call) {
      return {name: call.name, args: call.args};
    }

    return "Sorry, there was an error."
}

export default responseHandler;
