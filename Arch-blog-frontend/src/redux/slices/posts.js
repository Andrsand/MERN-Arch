import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => { // делаем асинхронный запрос
    const { data } = await axios.get('/posts'); // объясняем, что нужно вытащить data из асинхронного запроса
    return data; // и возвращаем, то что нам придет от бэкенда
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => { // делаем асинхронный запрос
    const { data } = await axios.get('/tags'); // объясняем, что нужно вытащить data из асинхронного запроса
    return data; // и возвращаем, то что нам придет от бэкенда
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
    axios.delete(`/posts/${id}`),
);

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
    reducers: {},                   // методы для обновления нашего стейта
    extraReducers: {               // здесь описываем сотояние нашего асинхронного экшна
        // получение статей
        [fetchPosts.pending]: (state) => { // Загрузка - объясняем, что у этого объекта есть ключ fetchPosts и это у нас функция с аргументом state)
            state.posts.items = [];        // при загрузке возвращаем пустой массив
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => { // Успешная загрузка - объясняем, что у этого объекта есть ключ fetchPosts и это у нас функция с аргументом state)
            state.posts.items = action.payload;
            state.posts.status = 'loaded';   // обновляем статус на loaded
        },
        [fetchPosts.rejected]: (state) => { // Ошибка - объясняем, что у этого объекта есть ключ fetchPosts и это у нас функция с аргументом state)
            state.posts.items = [];         // при ошибке возращаем пустой массив
            state.posts.status = 'error';   // обновляем статус на error
        },

        // получение тэгов
        [fetchTags.pending]: (state) => { // Загрузка - объясняем, что у этого объекта есть ключ fetchPosts и это у нас функция с аргументом state)
            state.tags.items = [];        // при загрузке возвращаем пустой массив
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => { // Успешная загрузка - объясняем, что у этого объекта есть ключ fetchPosts и это у нас функция с аргументом state)
            state.tags.items = action.payload;
            state.tags.status = 'loaded';   // обновляем статус на loaded
        },
        [fetchTags.rejected]: (state) => { // Ошибка - объясняем, что у этого объекта есть ключ fetchPosts и это у нас функция с аргументом state)
            state.tags.items = [];         // при ошибке возращаем пустой массив
            state.tags.status = 'error';   // обновляем статус на error
        },

        // удаление статьи
        [fetchRemovePost.pending]: (state, action) => { // Загрузка - объясняем, что у этого объекта есть ключ fetchPosts и это у нас функция с аргументом state)
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
        },
    },
});

export const postsReducer = postsSlice.reducer;


