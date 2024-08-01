import responseHandler from "../llm/general.js";
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    const response = await responseHandler(req.body.prompt);
    res.json(response);
});

export default router;
