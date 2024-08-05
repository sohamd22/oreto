import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

export { createSecretToken };