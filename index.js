import express from "express";

const app = express(); // создание приложения

app.get('/', (req, res) => { // Если клиент запрости главную страницу - ответ будет Hello World.
    res.send('Hello World');
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})