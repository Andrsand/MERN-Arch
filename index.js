import express from "express";

const app = express(); // создание приложения

app.use(express.json()); // для того чтобы express мог читать формат json

app.get('/', (req, res) => { // Если клиент запрости главную страницу - ответ будет Hello World.
    res.send('Hello World');
});

app.post('/auth/login', (req, res) => { // при запросе по джанному адресу дайем олтвет в json
    res.json({
        success: true,
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})