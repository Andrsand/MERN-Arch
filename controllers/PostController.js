import PostModel from '../models/Post.js';

// роут получения всех статей
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec(); // populate('user').exec() - связь между таблицами

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
}

// роут получения одной статьи
export const getOne = async (req, res) => {

    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate({
            _id: postId,
        },
            {
                $inc: { viewsCount: 1 }, // увеличение (инкрементирование ) просмотров статьи на 1
            },
            {
                returnDocument: 'after',
            },)
            .then((doc, err) => {            // в этом месте добавлены промисы из-за изменений в mongoose (у автора немного не так)
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось вернуть статью',
                    });
                }

                if (!doc) {                                  // если ошибок нет, но и такой статьи нет, то вовращаем соответсвующее сообщение
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    });
                }

                res.json(doc);                              // если все без ошибок и есть такая статья - возвращаем сам документ
            },
            );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
}

// роут удаления статьи
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({      // найти один документ и удалить его
            _id: postId,
        },)

            .then(
                (doc, err) => {
                    if (err) {                // если была ошибка ....
                        console.log(err);
                        return res.status(500).json({
                            message: 'Не удалось удалить статью',
                        });
                    }

                    if (!doc) {                       // если такой статьи в BD нет ...
                        return res.status(404).json({
                            message: 'Статья не найдена',
                        });
                    }

                    res.json({                        // если статья удалилась - выводим  success: true,
                        success: true,
                    });
                },
            );


    } catch (err) {

    }
}

// роут создание документа
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
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};