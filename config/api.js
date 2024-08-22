// src/config/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-endpoint.com/api', // Replace with your actual API base URL
});

export default api;
