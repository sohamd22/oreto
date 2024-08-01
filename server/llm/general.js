// Gemini Model Initialization
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// Function Calling
const functions = {
};

const generativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",

  tools: {
    functionDeclarations: [],
  },
});

const chat = generativeModel.startChat();

const responseHandler = async (prompt) => {
    const result = await chat.sendMessage(prompt);

    const call = result.response.functionCalls()[0];

    if (call) {
      const apiResponse = await functions[call.name](call.args);

      const result2 = await chat.sendMessage([{functionResponse: {
        name: '',
        response: apiResponse
      }}]);

      return result2;
    }

    return "Sorry, there was an error."
}

export default responseHandler;
