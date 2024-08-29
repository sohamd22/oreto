import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { google } from "googleapis";
import { initializeChat, responseHandler } from "../controllers/chatController.js";
import saveReminder from "../utils/saveReminder.js";
import dotenv from "dotenv";

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5173',
);

const checkEmails = async (user) => {
  oAuth2Client.setCredentials(user.google.tokens);
        
  const gmail = google.gmail({version: 'v1', auth: oAuth2Client});
  const result = await gmail.users.messages.list({
    userId: "me",
    q: user.data.emails.lastCheckTimeSeconds ? `after:${user.data.emails.lastCheckTimeSeconds}` : ""
  });
  const messages = user.data.emails.lastCheckTimeSeconds ? result.data.messages : result.data.messages.slice(0, 10);
  const lastCheckTimeSeconds = Math.floor(new Date().getTime() / 1000);

  const emailCategories = {
    work: [],
    financial: [],
    personal: [],
    social: [],
    promo: []
  };

  if (!messages) {
    return;
  }
  
  for (const { id } of messages) {
    const message = (await gmail.users.messages.get({
      userId: "me",
      id
    })).data;

    const datetime = parseInt(message.internalDate);

    const headers = message.payload.headers;
    const sender = headers.find(header => header.name == "From").value;
    const subject = headers.find(header => header.name == "Subject").value;

    const parts = message.payload.parts;
    let body = "";
    parts?.forEach(part => {
      if (part.mimeType == "text/plain") {
        body += Buffer.from(part.body.data, 'base64').toString();
      }
    });

    const prompt = 
    `Call the handleEmail function to extract important datetimes and categorize the following email:
    Sent On: ${(new Date(datetime)).toString()}
    Sender: ${sender}
    Subject: ${subject}
    Body: ${body}`;

    const result = (await responseHandler(prompt)).args;
    const {category, datetimeInfo} = result;
    
    const email = {
      id,
      sender,
      datetime,
      subject,
      category,
      datetimeInfo
    }

    if (datetimeInfo) {
      for (const datetime of datetimeInfo) {
        const reminder = {
          reminder: `${sender}: ${datetime.description}`,
          datetime: datetime.datetime
        }
        await saveReminder(reminder, user);
      }
    }

    emailCategories[category].push(email);
  };
  Object.keys(emailCategories).forEach((key, _) => {
    emailCategories[key] = [...emailCategories[key], ...user.data.emails.categories[key]]
  });
  user.data.emails.categories = emailCategories;
  user.data.emails.lastCheckTimeSeconds =  lastCheckTimeSeconds;
  await user.save();
}

const userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
      return res.json({ status: false });
  }
  const isCustomAuth = token.length < 500;

  if (isCustomAuth) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        return res.json({ status: false });
      } 
      else {
        const user = await User.findById(data.id);
        if (user) {
          initializeChat(user);
          return res.json({ status: true, user: {name: user.name, email: user.email, lists: user.lists} });
        }
        else {
          return res.json({ status: false });
        }
      }
    });
  }
  else {
    try {
      const googleUser = await oAuth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const user = await User.findOne({ email: googleUser.payload.email });
      if (user) {
        initializeChat(user);
        await checkEmails(user);

        return res.json({ status: true, user: {name: user.name, email: user.email, emails: user.data.emails.categories, lists: user.data.lists, reminders: user.data.reminders.filter(reminder => 0 < new Date() - new Date(reminder.datetime) < 6.048e+8 )}});
      }
      else {
        return res.json({ status: false });
      }
    } 
    catch (err) {
      console.log(err);
      return res.json({ status: false });
    }        
  }  
}

export { userVerification };