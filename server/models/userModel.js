import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    google: {
        id: String,
        email: String,
    },
    lists: [],
    chatHistory: [],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

userSchema.pre("save", async function () {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 12);
    }
});

export default mongoose.model("User", userSchema);