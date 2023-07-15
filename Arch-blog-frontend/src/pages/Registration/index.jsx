import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import styles from './Login.module.scss';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth); // isAuth объясняет нам авторизованы мы или нет
  const dispatch = useDispatch();
  const {                           // вытаскиваем параметры формы
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {                // укапзываем изначальное состояние полей формы
      fullname: '',
      email: '',
      password: '',
    },
    mode: 'onChange',               // указываем, что валидация должна происходить только в случае изменения этих полей
  });

  const onSubmit = async (values) => {  // эта функция выполняется только в случае коректной валидации
    const data = await dispatch(fetchRegister(values));  // получить объект values м передать его в бэкенд

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }


    if ('token' in data.payload) {                      // если в data есть token то сохраняем его в localstorage
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {                   // если мы авторизованы то - переход на главную страницу
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)} // если errors.email ?.message получена то будет - true и будет подсветка красным
          helperText={errors.fullName?.message}   // если есть ошибка то возьми параметр errors и вытащи message если нет - то не надо вытаскивать
          {...register('fullName', { required: 'Укажите полное имя' })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />

        <TextField
          error={Boolean(errors.email?.message)} // если errors.email ?.message получена то будет - true и будет подсветка красным
          helperText={errors.email?.message}   // если есть ошибка то возьми параметр errors и вытащи message если нет - то не надо вытаскивать
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />

        <TextField
          error={Boolean(errors.password?.message)} // если errors.email ?.message получена то будет - true и будет подсветка красным
          helperText={errors.password?.message}   // если есть ошибка то возьми параметр errors и вытащи message если нет - то не надо вытаскивать
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />

        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
