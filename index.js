import express from "express";
import mongoose from 'mongoose'

import { registerValidation, loginValidation } from './validations.js';

import * as UserController from './controllers/UserController.js'; // импортируем все методы из данного файла



import checkAuth from "./utils/checkAuth.js";

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express(); // создание приложения

app.use(express.json()); // для того чтобы express мог читать формат json

app.post('/auth/login', loginValidation, UserController.login); // импорт методов из UserController.js

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})
