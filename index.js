import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

import { registerValidation } from './validations/auth.js';
import { validationResult } from "express-validator";

import UserModel from './models/User.js';

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express(); // создание приложения

app.use(express.json()); // для того чтобы express мог читать формат json

app.post('/auth/login', async (req, res) => {    // авторизация
    try {
        const user = await UserModel.findOne({ email: req.body.email });  // проверяем, есть ли в базе данных пользователь из запроса body.

        if (!user) {                                                      // если такого пользователя в базе нет - возвращаем соответсвующее сообщение.
            return req.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash); // если же юзер найден, указываем что бы bcrypt сравнил (compare) пароль из тела запроса с тем что в _doc.passwordHash

        if (!isValidPass) {                                  // если пароль не подходит - выводим соответствующее сообщение
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(                         // если юзер и пароль совпаадают - созаем новый токен
            {
                _id: user._id,                          // это нужно для того, чтобы потом по этому id проверять авторизован ли пользователь, кто отн такой и тд.
            },
            'secret123',                                // секретный ключ
            {
                expiresIn: '30d',                       // срок жизни токена
            },
        );

        const { passwordHash, ...userData } = user._doc;  // вытаскиваем passwordHash но использовать его не будем а просто вернем все остальное в  ...userData

        res.json({                                     // если ошибок нет, вернем информацию о юзере и токен
            ...userData,
            token,
        });
    } catch (err) {                                   // если ошибка - выводим соответсвующее сообщение
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
});

app.post('/auth/register', registerValidation, async (req, res) => { // при запросе по джанному адресу проверяем валидатором, есть ли в запросе точто мы хотим и только после этого выполняем следующую часть
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {                                   // проверка на ошибки
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;             // вытаскиваем из body запрос - пароль
        const salt = await bcrypt.genSalt(10);          // алгоритм шифрования пароля
        const hash = await bcrypt.hash(password, salt); // шифруем пароль спомощью созданного ранее алгоритма

        const doc = new UserModel({                     // создание документа пользователя с помощью MongoDB
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();                  // сохраняем документ в mongoDB и результат возвращаем в user

        const token = jwt.sign(
            {
                _id: user._id,                              // это нужно для того, чтобы потом по этому id проверять авторизован ли пользователь, кто отн такой и тд.
            },
            'secret123',                                // секретный ключ
            {
                expiresIn: '30d',                       // срок жизни токена
            },
        );

        const { passwordHash, ...userData } = user._doc;  // вытаскиваем passwordHash но использовать его не будем а просто вернем все остальное в  ...userData

        res.json({                                     // если ошибок нет, вернем информацию о юзере и токен
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }

});



app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})
