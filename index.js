import express from "express";
import mongoose from 'mongoose';
import multer from "multer";
import cors from 'cors'; // библиотека для разблокировки перехода с других доменов

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import { handleValidationErrors, checkAuth } from "./utils//index.js";
import { UserController, PostController } from './controllers/index.js'; // импортируем все методы из данного файла



mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express(); // создание приложения

const storage = multer.diskStorage({    // схранилище для загрузки файлов картинок
    destination: (_, __, cb) => {        // прочерки - для того что бы не вводить ненужные нам параметры функции
        cb(null, 'uploads');            // cb говорит что нет ошибок и возвращиет путь файла (папка uploads)
    },
    filename: (_, file, cb) => {        // перед сохранением файла объясняем функции, что мы хотим из файла вытащить оригинальное название
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });     // объясняем, что у нас есть upload, multer и хранилище - storage

app.use(express.json()); // для того чтобы express мог читать формат json
app.use(cors());
app.use('/uploads', express.static('uploads')); // объясняем express чтобы проверял, есть ли в uploads тот файл который мы загружаем

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login); // импорт методов из UserController.js

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

// роут загрузки картинки
app.post('/upload', checkAuth, upload.single('image'), (req, res) => { // если есть запрос на upload - использвем мидлвеар single из multer, затем говорим, что ожидаем файл с названием image
    res.json({
        url: `/uploads/${req.file.originalname}`,           // далее показываем пользователю куда сохранили файл и его оригинальное название
    });
});


app.get('/posts', PostController.getAll); // получение всех статей
app.get('/posts/tags', PostController.geLastTags); // получение всех последних тегов
app.get('/posts/:id', PostController.getOne); // получение одной статьи по динамическому параметру :id
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create); // создание статьи (только после валидации)
app.delete('/posts/:id', checkAuth, PostController.remove); // удаление статьи
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update); // обновление статьи


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});
