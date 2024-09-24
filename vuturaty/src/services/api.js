import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await api.post('/auth/refresh-token', { refreshToken });
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export default api;