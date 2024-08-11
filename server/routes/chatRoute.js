import express from 'express';
import { responseHandler } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const response = await responseHandler(req.body.prompt, req.body.email);
    res.json(response);
});

export default router;
