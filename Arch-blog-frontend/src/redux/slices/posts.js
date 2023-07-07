import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => { // делаем асинхронный запрос
    const { data } = await axios.get('/posts'); // объясняем, что нужно вытащить data из асинхронного запроса
    return data; // и возвращаем, то что нам придет от бэкенда
});

const initialState = {
    posts: {                      // статьи
        items: [],
        status: 'loading',
    },
    tags: {                      // тэги
        items: [],
        status: 'loading',
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},                   // методы для обновления нашего стейта
});

export const postsReducer = postsSlice.reducer;


