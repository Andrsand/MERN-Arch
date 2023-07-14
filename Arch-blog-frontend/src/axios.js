import axios from "axios";

const instance = axios.create({ // объясняем axios что он должен создать новую оболочку
    baseURL: 'http://localhost:4444' // объясняем что нужно делать всегда запросы на http://localhost:4444
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});


export default instance;