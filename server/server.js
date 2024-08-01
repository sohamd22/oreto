import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/users.js";
import promptRouter from "./routes/prompt.js";

// Server
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/prompt', promptRouter);

// Server Hosting
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
