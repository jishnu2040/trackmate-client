// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',  // Update with your API URL
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');  // Retrieve the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Set the token in the Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh');
        const response = await axios.post('http://127.0.0.1:8000/api/v1/accounts/token/refresh/', {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('access', access);
        
        // Update the `Authorization` header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        
        // Update the `Authorization` header in the original request and retry
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
