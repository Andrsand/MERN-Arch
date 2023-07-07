import axios from "axios";

const instance = axios.create({ // объясняем axios что он должен создать новую оболочку
    baseURL: 'http://localhost:4444' // объясняем что нужно делать всегда запросы на http://localhost:4444
});

export default instance;