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
        description: "Name of tab to activate which can be `emails` to work with emails or `lists` to work with lists (only if they are todo lists).",
      },
    },
    required: ["tab"],
  },
};

const createListFunctionDeclaration = {
  name: "createList",
  parameters: {
    type: "OBJECT",
    description: "Create name and items of a list.",
    properties: {
      name: {
        type: "STRING",
        description: "Name of the list, preferably 1-2 words based on user prompt.",
      },
      items: {
        type: "STRING",
        description: "JSON String with array of short list items. Can enhance the items and autofill if specified."
      },
      backgroundColor: {
        type: "STRING",
        description: "Appropriate color based on list name (e.g. green for Grocery). Can be `green`, `lime`, `yellow`, `blue`, `rose`, `violet`, `indigo`, `cyan`. If user specifies, pick the closest option."
      }
    },
    required: ["name", "items", "backgroundColor"],
  },
}

const accessWebContentFunctionDeclaration = {
  name: "accessWebContent",
  parameters: {
    type: "OBJECT",
    description: "Access the content of a mentioned webpage that hasn't previously been scraped.",
    properties: {
      link: {
        type: "STRING",
        description: "Link to the webpage that has to be accessed.",
      },
      prompt: {
        type: "STRING",
        description: "User's prompt."
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
    temperature: 0.3
  }
});

const chat = generativeModel.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: `You are a personalized AI assistant named Oreto. You have function calling and are able to call the right 
        functions when required, you only return text responses when none of the functions match. When a user tells you something
        that you don't know, let them know you dont't know but can answer questions if the user includes some context with a
        a link. If a user prompt has multiple links let the user know you can only access one link at a time, then you can include
        any information about the first link. If the link does not start with http/https, let the user know it must.
        
        If a user prompt has any subtext starting with ~~, then that is just additional info added by the server for you to remember that the user is not aware of,
        do not mention it in front of the user.` }],
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

      const result = await chat.sendMessage(`${prompt}\n~~Text content scraped from ${link}:${text}\nLinks on the webpage: ${links}`);
      return {name: 'displayResponse', args: { response: result.response.text() }}
    }
    catch (error) {
      const result = await chat.sendMessage(`${prompt}\n~~Server wasn't able to access ${link}, tell user that they can try a different link.`);
      return {name: 'displayResponse', args: { response: result.response.text() }}
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

const visitedLinks = new Set();

// Chat Response Handler
const responseHandler = async (prompt) => {
    let words = prompt.split(/\s+/);
    let link = null;
    for (let word of words) {
      try {
          let potentialUrl = new URL(word);
          link = potentialUrl.href;
          break;
      } catch (e) {
      }
    }

    if (link && !visitedLinks.has(link)) {
      visitedLinks.add(link);
      return functions.accessWebContent({ link, prompt });
    }

    const result = await chat.sendMessage(prompt);
    const call = result.response.functionCalls() ? result.response.functionCalls()[0] : null;

    if (call) {
      if (call.name in functions) {
        return functions[call.name](call.args);
      }
      else {
        return {name: call.name, args: call.args};
      }      
    }
    else {
      return {name: 'displayResponse', args: { response: result.response.text() }}
    }
}

export default responseHandler;
