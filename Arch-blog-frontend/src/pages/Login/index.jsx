import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form"; // импорт библиотеки форм

import styles from "./Login.module.scss";

export const Login = () => {        // подключаем библиотеку useForm
  const {                           // вытаскиваем параметры формы
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {                // укапзываем изначальное состояние полей формы
      email: '',
      password: '',
    },
    mode: 'onChange',               // указываем, что валидация должна происходить только в случае изменения этих полей
  });

  const onSubmit = (values) => {  // эта функция выполняется только в случае коректной валидации
    console.log(values);
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}> {/*вызов формы при корректной валидации */}
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)} // если errors.email ?.message получена то будет - true и будет подсветка красным
          helperText={errors.email?.message}   // если есть ошибка то возьми параметр errors и вытащи message если нет - то не надо вытаскивать
          type="email"
          {...register('email', { required: 'Укажите почту' })} // если поле не заполнено - выходит надпись "укажите почту"
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)} // если errors.password ?.message получена то будет - true и будет подсветка красным
          helperText={errors.password?.message}   // если есть ошибка то возбми параметр errors и вытащи message если нет - то не надо вытаскивать
          {...register('password', { required: 'Укажите пароль' })} // если поле не заполнено - выходит надпись "укажите почту"
          fullWidth />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};

