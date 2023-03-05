import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'https://formatador-server.onrender.com/api',
  headers: { 'content-type': 'application/json' },
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

export default api;
