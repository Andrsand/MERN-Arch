import express from "express";
import mongoose from 'mongoose'

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import * as UserController from './controllers/UserController.js'; // импортируем все методы из данного файла
import * as PostController from './controllers/PostController.js';


import checkAuth from "./utils/checkAuth.js";

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express(); // создание приложения

app.use(express.json()); // для того чтобы express мог читать формат json

app.post('/auth/login', loginValidation, UserController.login); // импорт методов из UserController.js

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll); // получение всех статей
app.get('/posts/:id', PostController.getOne); // получение одной статьи по динамическому параметру :id
app.post('/posts', checkAuth, postCreateValidation, PostController.create); // создание статьи (только после валидации)
//app.delete('/posts', PostController.remove); // удаление статьи
//app.patch('/posts', PostController.update); // обновление статьи


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})
