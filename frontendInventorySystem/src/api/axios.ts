import axios from 'axios';
import { BASE_URL } from '../config/config';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const token = localStorage.getItem('access_token');

export const RegisterUser = async (data: { username: string; password: string }) => {
  return api.post('/api/register/', data);
};

export const LoginUser = async (data: { username: string; password: string }) => {
  return api.post('/api/login/', data);
};

export const GetProducts = async () => {
  return api.get('/api/products/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const LogoutUser = async (refresh_token: string) => {
  return api.post('/api/logout/', { refresh_token }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
