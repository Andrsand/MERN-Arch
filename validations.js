import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),  // если в теле запроса именно email то все ОК если это не email то валидатор нас оповестит
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),  // пароль не должен быть менее 5 строк иначе получим оповещение
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),  // если в теле запроса именно email то все ОК если это не email то валидатор нас оповестит
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),  // пароль не должен быть менее 5 строк иначе получим оповещение
    body('fullName', 'Укажите имя').isLength({ min: 3 }),   // имя должно быть не менее 3 символов
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),    // если опционально придет аватар, то нужно проверить является ли это ссылкой?

];

// валидация статьи
export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('imagerUrl', 'Неверная ссылка на изображение').optional().isString(),

];