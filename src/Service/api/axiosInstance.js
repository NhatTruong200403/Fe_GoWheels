// src/services/api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: "https://localhost:7265",
  timeout: 10000,
});

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default instance;
