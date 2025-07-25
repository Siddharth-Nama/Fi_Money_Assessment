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
  return api.post('/register', data);
};

export const LoginUser = async (data: { username: string; password: string }) => {
  return api.post('/login', data);
};

export const GetProducts = async () => {
  return api.get('/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const LogoutUser = async (refresh_token: string) => {
  return api.post('/logout', { refresh_token }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addProduct = async (data: { name: string; type: string; sku: string; image_url: string; description: string; quantity: number; price: number }) => {
  return api.post('/products', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdateProductQuantity = async (id: number, quantity: number) => {
  return api.put(`/products/${id}/quantity`, { quantity }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
