import jwt from 'jsonwebtoken';

// функция проверки информации о себе
export default (req, res, next) => {
    const token = req.headers.authorization;

    console.log(token);

    next();
};