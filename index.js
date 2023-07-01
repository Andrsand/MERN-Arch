import express from "express";
import mongoose from 'mongoose'

import { registerValidation } from './validations/auth.js';



import checkAuth from "./utils/checkAuth.js";

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express(); // создание приложения

app.use(express.json()); // для того чтобы express мог читать формат json

app.post('/auth/login');

app.post('/auth/register');

app.get('/auth/me');

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})
