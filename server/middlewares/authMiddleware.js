import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { google } from "googleapis";
import { responseHandler } from "../controllers/promptController.js";
import dotenv from "dotenv";

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5173',
);

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
        if (user)
          return res.json({ status: true, user: {name: user.name, email: user.email, lists: user.lists} });
        else
          return res.json({ status: false });
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
        oAuth2Client.setCredentials(user.google.tokens);
        
        const gmail = google.gmail({version: 'v1', auth: oAuth2Client});
        const result = await gmail.users.messages.list({
          userId: 'me',
        });
        const messages = result.data.messages.slice(0, 5);

        const emails = [];

        messages.forEach(async ({ id }) => {
          const message = (await gmail.users.messages.get({
            userId: "me",
            id
          })).data;

          const headers = message.payload.headers;

          const date = new Date(parseInt(message.internalDate));
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
          `Call the handleEmail function to improve the subject, extract datetimes, and categorize the following email:
          Sender: ${sender}
          Subject: ${subject}
          Body: ${body}`;
 
          const result = await responseHandler(prompt);
          console.log(result);
          console.log('-----------');
        });

        return res.json({ status: true, user: {name: user.name, email: user.email, lists: user.lists }});
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