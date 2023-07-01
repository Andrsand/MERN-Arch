import jwt from 'jsonwebtoken';

// функция проверки информации о себе
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); // если пришел токен или нет то передавать в любом случае строку. Регуляркой удаляем слово Bearer и заменяем на пустую строку.

    if (token) {                // если токен есть - то с помощью jwt.verify расшифровываем токен с ключом secret123, иначе верни сообщение со статусом 403
        try {
            const decoded = jwt.verify(token, 'secret123');

            req.userId = decoded._id; // если токет расшифрован то вытаскиваем в req наш _id.
            next();                   // если все нормально то выполняется следующая функция.
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
};