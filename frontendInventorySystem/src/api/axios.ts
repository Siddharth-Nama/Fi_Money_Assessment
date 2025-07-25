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

export const addProduct = async (payload: { name: string; type: string; sku: string; image_url: string; description: string; quantity: number; price: number }) => {
  return api.post('/api/products/', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdateProductQuantity = async (id: number, quantity: number) => {
  return api.patch(`/api/products/${id}/`, { quantity }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
