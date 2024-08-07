// Gemini Model Initialization
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer from 'puppeteer';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function Calling
// Function Declarations
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
}

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
}

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
}

// Model
const generativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",

  tools: {
    functionDeclarations: [activateTabFunctionDeclaration, createListFunctionDeclaration, accessWebContentFunctionDeclaration],
  },
  generationConfig: {
    temperature: 0
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
          - Working with emails.
          - Accessing http/https websites that haven't been accessed before (specify: one link at a time and has
            to start with http/https).
          - Sending reminders and suggestions.
          - Saving any relevant info that can be used to personalize the user's experience as a memory.
          - Activating tabs.
          Never name the corresponding functions in front of the user.
          
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
      
      return responseHandler(`${prompt}\n~~Text content scraped from ${link}:${text}\nLinks on the webpage: ${links}`);
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
      for (const property in call.args) {
        call.args[property] = call.args[property].replace('\\', '');
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
