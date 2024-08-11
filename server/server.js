import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import User from "./models/userModel.js";

import userRouter from "./routes/authRoute.js";
import chatRouter from "./routes/chatRoute.js";
import { userVerification } from "./middlewares/authMiddleware.js";

dotenv.config();

// Database
mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log("MongoDB is connected successfully"))
.catch((error) => console.error(error));

// Server
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.post('/', userVerification);
app.use('/auth', userRouter);
app.use('/chat', chatRouter);

app.post('/lists/save', async (req, res) => {
    const {lists, email} = req.body;
    const user = await User.findOne({ email });
    if (user) {
        user.data.lists = lists;
        user.save();
    }
});

// Server Hosting
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
