// src/utils/axios.js
import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

// // Attach token if available
// const token = localStorage.getItem('token')
// if (token) {
//     instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error); 
    }
  );

export default instance
