import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error, err'));

const app = express(); // создание приложения

app.use(express.json()); // для того чтобы express мог читать формат json

app.get('/', (req, res) => { // Если клиент запрости главную страницу - ответ будет Hello World.
    res.send('Hello World');
});

app.post('/auth/login', (req, res) => { // при запросе по джанному адресу даем олтвет в json
    console.log(req.body);              // вывод в консоль того, что содержиться в запросе

    const token = jwt.sign({            // команда sign генерирует token
        email: req.body.email,          // в в токене шифруется email и fullName из запроса юзера
        fullName: 'Вася Пупкин',
    }, 'secret123');                    // указываем, что все это нужно зашифровать с помощью напр. ключа "secret123"

    res.json({
        success: true,
        token,                          // возвращаем token юзеру в ответ на его запрос
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})