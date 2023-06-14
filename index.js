import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'

import { registerValidation } from './validations/auth.js';
import { validationResult } from "express-validator";

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error, err'));

const app = express(); // создание приложения

app.use(express.json()); // для того чтобы express мог читать формат json

app.post('/auth/register', registerValidation, (req, res) => { // при запросе по джанному адресу проверяем валидатором, есть ли в запросе точто мы хотим и только после этого выполняем следующую часть
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                                   // проверка на ошибки
        return res.status(400).json(errors.array());
    }

    res.json({                                                 // если ошибок нет, вернем success true
        success: true,
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})