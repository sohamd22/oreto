import express from "express";
import { Signup, Login, GoogleAuth } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/google", GoogleAuth);

export default router;