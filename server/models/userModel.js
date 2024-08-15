import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

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
    google: {
        id: String,
        tokens: {}
    },
    data: {
        lists: [],
        chatHistory: [],
        emails: {
            lastCheckTimeSeconds: Number,
            categories: {
                work: [],
                financial: [],
                personal: [],
                social: [],
                promo: []
            }
        }
    },  
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

userSchema.plugin(encrypt, { secret: process.env.ENCRYPTION_SECRET });

export default mongoose.model("User", userSchema);