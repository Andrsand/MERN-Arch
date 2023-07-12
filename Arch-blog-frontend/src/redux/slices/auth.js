import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => { // params - берем информацию со всеми параметрами
    const { data } = await axios.get('/auth/login', params);  // объясняем, что есть асинхронный экшн тут будет храниться email и пароль
    return data;  // если все нормально - получаем объект с информацией о пользователе
});

const initialState = {
    data: null,           // информация о пользователе изначально хранится в data и бедет null
    status: 'loading',    // информация о пользователе загружается
};

const authSlice = createSlice({
    name: 'auth',          // объясняем, что слайс называется name
    initialState,
    extraReducers: {  // информацию о пользователе мы получаем из асинхронного экшна и получив сохраняем в наш стейт
        [fetchUserData.pending]: (state) => {
            state.status = 'loading';        // при загрузке возвращаем статус loading
            state.data = null;               // запрос сделался и изначально он null
        },
        [fetchUserData.fulfilled]: (state, action) => { // Успешная загрузка 
            state.status = 'loaded';                    // Статус - загружен
            state.data = action.payload;
        },
        [fetchUserData.rejected]: (state) => { // Ошибка - объясняем, что у этого объекта есть ключ fetchUserData и это у нас функция с аргументом state)
            state.status = console.error;;     // обновляем статус на error
            state.data = null;
        },
    },
});

export const authReducer = authSlice.reducer;

