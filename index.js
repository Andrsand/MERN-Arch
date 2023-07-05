import express from "express";
import mongoose from 'mongoose'
import multer from "multer";

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import * as UserController from './controllers/UserController.js'; // импортируем все методы из данного файла
import * as PostController from './controllers/PostController.js';


import checkAuth from "./utils/checkAuth.js";

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express(); // создание приложения

const storage = multer.diskStorage({    // схранилище для загрузки файлов картинок
    destination: (_, _, cb) => {        // прочерки - для того что бы не вводить ненужные нам параметры функции
        cb(null, 'uploads');            // cb говорит что нет ошибок и сохраняет файл в папку uploads
    },
});

app.use(express.json()); // для того чтобы express мог читать формат json

app.post('/auth/login', loginValidation, UserController.login); // импорт методов из UserController.js

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll); // получение всех статей
app.get('/posts/:id', PostController.getOne); // получение одной статьи по динамическому параметру :id
app.post('/posts', checkAuth, postCreateValidation, PostController.create); // создание статьи (только после валидации)
app.delete('/posts/:id', checkAuth, PostController.remove); // удаление статьи
app.patch('/posts/:id', checkAuth, PostController.update); // обновление статьи


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})
