import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { OAuth2Client } from 'google-auth-library'
import dotenv from "dotenv";

dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
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
          return res.json({ status: true, user: user.name });
        else
          return res.json({ status: false });
      }
    });
  }
  else {
    const user = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    if (user) {
      return res.json({ status: true, user: user.payload.name });
    }
    else {
      return res.json({ status: false });
    }    
  }  
}

export { userVerification };