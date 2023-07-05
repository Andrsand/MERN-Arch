import { validationResult } from "express-validator";

export default (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                                   // проверка на ошибки
        return res.status(400).json(errors.array());           // если валидация не прошла - верни ошибку 
    }

    next();               // если валидация прошла - иди далее
};