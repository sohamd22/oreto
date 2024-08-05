import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRouter from "./routes/authRoute.js";
import promptRouter from "./routes/promptRoute.js";

// Server
dotenv.config();

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/', userRouter);
app.use('/prompt', promptRouter);

// Database
mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log("MongoDB is connected successfully"))
.catch((error) => console.error(error));

// Server Hosting
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
