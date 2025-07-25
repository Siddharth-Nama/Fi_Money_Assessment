import axios from 'axios';
import { BASE_URL } from '../config/config';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const token = localStorage.getItem('access_token');

export const RegisterUser = async (data: { username: string; password: string }) => {
  return api.post('/api/register/', data);
};

export default api;
