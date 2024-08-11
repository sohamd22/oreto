// Gemini Model Initialization
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer from 'puppeteer';
import functionDeclarations from "../utils/chatFunctionDeclarations.js";
import User from "../models/userModel.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model
const generativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",

  tools: {
    functionDeclarations,
  },
  generationConfig: {
    temperature: 0.25
  }
});

const chat = generativeModel.startChat({
  history: [
    {
      role: "user",
      parts: [{ 
        text: 
          `You are a personalized AI assistant named Oreto. You have the following function calling abilities:
          - Creating lists.
          - Handling emails (only call the handleEmail function when given this key: ~~handleEmail).
          - Accessing http/https websites that haven't been accessed before (specify: one link at a time and has
            to start with http/https).
          - Sending reminders and suggestions.
          - Saving any relevant info that can be used to personalize the user's experience as a memory.
          - Activating tabs.
          Never name the corresponding functions in front of the user. Always use function calling for any of
          these.
          
          Besides these, you also have the ability to converse with the user and answer their questions. 
          If you believe you need context to reply to a prompt, you can ask the user to provide context 
          either through text or a link. Ask clarifying questions if and only if not enough information 
          is available to complete the request.
          Please do not use the backslash (\\) character in your responses.

          If a prompt has the characters ~~ in it, that signifies additional server added info for you to remember, 
          it was not added by the user so do not mention it in front of them.` 
      }],
    },
  ]
});

const functions = {
  accessWebContent: async ({ link, prompt }) => {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    try {
      await page.goto(link, {waitUntil: 'domcontentloaded'});
      const text = await page.$eval('*', (el) => el.innerText);
      const links = (await page.$$eval('a', (anchors) => anchors.map(anchor => anchor.href))).join(' ');
      
      return responseHandler(`${prompt}\n~~Text content scraped from ${link}:${text}\n~~Links on the webpage: ${links}`);
    }
    catch (error) {
      return responseHandler(`${prompt}\n~~Server wasn't able to access the provided link(s), tell user that they can try a different link.`);
    }
    finally {
      await browser.close();
    }
  },
  
  saveMemories: async ({ memories }) => {
    memories = JSON.parse(memories.replace('\\', ''));

    memories.forEach(memory => {
      
    });
  }
}

// Chat Response Handler
const responseHandler = async (prompt) => {
    const result = await chat.sendMessage(prompt);
    const call = result.response.functionCalls() ? result.response.functionCalls()[0] : null;

    if (call) {
      console.log(call);
      
      for (const property in call.args) {
        call.args[property] = call.args[property].replace(/\\/g, '');
      }

      if (call.name in functions) {
        return functions[call.name](call.args);
      }
      else {
        return {name: call.name, args: call.args, response: result.response.text().replace('\\', '')};
      }      
    }
    else {
      return { response: result.response.text().replace('\\', '') };
    }
}

export { responseHandler };
