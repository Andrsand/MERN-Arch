import PostModel from '../models/Post';

// создание документа
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.title,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,            // userId мы вытаскиваем уже не из body а из checkAuth.js - req.userId = decoded._id;
        });

        const post = await doc.save();   // сохраняем документ

        res.json(post);                  // возвращаем ответ
    } catch (err) {

    }
};