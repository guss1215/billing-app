// src/services/api.ts

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/billing', // Adjust the API base URL
});

export default api;
