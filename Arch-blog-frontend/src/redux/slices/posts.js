import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: {                      // статьи
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


