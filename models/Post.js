import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {           // колличество просмотров
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,  // объясняем что есть mongoose у него есть схема с типом ObjectId
        ref: 'User',                           // ссылка на модель User т.е. делается связь между двумя моделями
        required: true,
    },
    imageUrl: String,   // это опциональное свойство юзера поэтому мы передаем его не как объект, в отличии от обязательныъх свойств выше
},

    {
        timestamps: true,
    },
);

export default mongoose.model('Post', PostSchema);