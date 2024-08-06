import express from "express";
import { Signup, Login, GoogleAuth } from "../controllers/authController.js";
import { userVerification } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/google-auth", GoogleAuth);
router.post("/", userVerification);

export default router;