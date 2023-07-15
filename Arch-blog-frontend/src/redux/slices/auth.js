import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => { // params - берем информацию со всеми параметрами
    const { data } = await axios.post('/auth/login', params);  // объясняем, что есть асинхронный экшн тут будет храниться email и пароль
    return data;  // если все нормально - получаем объект с информацией о пользователе
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => { // params - берем информацию со всеми параметрами
    const { data } = await axios.post('/auth/register', params);  // объясняем, что есть асинхронный экшн тут будет храниться email и пароль
    return data;  // если все нормально - получаем объект с информацией о пользователе
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (params) => { // params - берем информацию со всеми параметрами
    const { data } = await axios.get('/auth/me');  // объясняем, что есть асинхронный экшн тут будет храниться email и пароль
    return data;  // если все нормально - получаем объект с информацией о пользователе
});

const initialState = {
    data: null,           // информация о пользователе изначально хранится в data и бедет null
    status: 'loading',    // информация о пользователе загружается
};

const authSlice = createSlice({
    name: 'auth',          // объясняем, что слайс называется name
    initialState,
    reducers: {
        logout: (state) => {   // выход из аккаунта
            state.data = null;
        }
    },
    extraReducers: {  // информацию о пользователе мы получаем из асинхронного экшна и получив сохраняем в наш стейт
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';        // при загрузке возвращаем статус loading
            state.data = null;               // запрос сделался и изначально он null
        },
        [fetchAuth.fulfilled]: (state, action) => { // Успешная загрузка 
            state.status = 'loaded';                    // Статус - загружен
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => { // Ошибка - объясняем, что у этого объекта есть ключ fetchUserData и это у нас функция с аргументом state)
            state.status = console.error;;     // обновляем статус на error
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';        // при загрузке возвращаем статус loading
            state.data = null;               // запрос сделался и изначально он null
        },
        [fetchAuthMe.fulfilled]: (state, action) => { // Успешная загрузка 
            state.status = 'loaded';                    // Статус - загружен
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => { // Ошибка - объясняем, что у этого объекта есть ключ fetchUserData и это у нас функция с аргументом state)
            state.status = console.error;;     // обновляем статус на error
            state.data = null;
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';        // при загрузке возвращаем статус loading
            state.data = null;               // запрос сделался и изначально он null
        },
        [fetchRegister.fulfilled]: (state, action) => { // Успешная загрузка 
            state.status = 'loaded';                    // Статус - загружен
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => { // Ошибка - объясняем, что у этого объекта есть ключ fetchUserData и это у нас функция с аргументом state)
            state.status = console.error;;     // обновляем статус на error
            state.data = null;
        },
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data); // функция проверяет state на предмет - естьли в auth - data

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;   // экспорт из authSlice всех экшнов, но вытаскиваем logout