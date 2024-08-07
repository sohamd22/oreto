import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { createSecretToken } from "../utils/secretToken.js";
import { OAuth2Client } from "google-auth-library";
import { jwtDecode } from 'jwt-decode';
import dotenv from "dotenv";

dotenv.config();

const Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
    });

    res
        .status(201)
        .json({ message: "User signed up successfully", success: true });
    next();
  } 
  catch (error) {
    console.error(error);
  }
}

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
        .status(201)
        .json({ message: "User logged in successfully", success: true });
    next();
  } 
  catch (error) {
    console.error(error);
  }
}

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
);

const GoogleAuth = async (req, res, next) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    const { name, email, sub } = jwtDecode(tokens.id_token);

    let user = await User.findOne({ email });
    if (user) {
      if (!user.google.id) {
        user.google.id = sub;
        user.google.email = email;
        user.save();
      }
    }
    else {
      user = await User.create({ name, email, google: {
        id: sub,
        email
      }})
    }
    
    res.cookie("token", tokens.id_token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
        .status(201)
        .json({ message: "User signed in successfully", success: true });
    next();    
  } 
  catch (error) {
    console.error(error);
  }
}

export { Signup, Login, GoogleAuth };