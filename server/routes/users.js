import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
    console.log(req.body);

    res.json({
        message: "User data received",
    });
});

router.post('/login', (req, res) => {
    console.log(req.body);

    res.json({
        message: "User data received",
    });
});

export default router;