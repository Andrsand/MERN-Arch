import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

import { registerValidation } from './validations/auth.js';
import { validationResult } from "express-validator";

import UserModel from './models/User.js';

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error, err'));

const app = express(); // создание приложения

app.use(express.json()); // для того чтобы express мог читать формат json

app.post('/auth/register', registerValidation, async (req, res) => { // при запросе по джанному адресу проверяем валидатором, есть ли в запросе точто мы хотим и только после этого выполняем следующую часть
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                                   // проверка на ошибки
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;             // вытаскиваем из body запрос - пароль
    const salt = await bcrypt.genSalt(10);          // алгоритм шифрования пароля
    const passwordHash = await bcrypt.hash(password, salt); // шифруем пароль спомощью созданного ранее алгоритма

    const doc = new UserModel({                     // создание документа пользователя с помощью MongoDB
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: req.body.passwordHash,
    });

    const user = await doc.save();                  // сохраняем документ в mongoDB и результат возвращаем в user

    res.json(user);                                             // если ошибок нет, вернем информацию о юзере

    app.listen(4444, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log('Server OK');
    })
})