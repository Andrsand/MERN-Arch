import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fillName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});