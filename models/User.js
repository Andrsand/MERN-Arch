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
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,   // это опциональное свойство юзера поэтому мы передаем его не как объект, в отличии от обязательныъх свойств выше

},
    {
        timestamps: true,
    },

);

export default mongoose.model('User', UserSchema);