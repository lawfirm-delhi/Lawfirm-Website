import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Required for sending/receiving HttpOnly cookies (refresh tokens)
});

// Utility to set the JWT access token for all subsequent requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

api.interceptors.request.use((config) => {
  if (config.url && config.url.includes('/admin/')) {
    const adminPassword = localStorage.getItem('admin_password');
    if (adminPassword) {
      config.headers['x-admin-password'] = adminPassword;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
