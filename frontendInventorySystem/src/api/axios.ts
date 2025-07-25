import axios from 'axios';
import { BASE_URL } from '../config/config';

const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
