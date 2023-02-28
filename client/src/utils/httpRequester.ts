import axios from "axios";
import { SuccessCreateBody } from './types/ResponseTypes';
import { getUserAgent } from './../hooks/getUserAgent';

export const baseURL = "http://localhost:7000/api";
export const api = axios.create({
  withCredentials: true, baseURL
});

api.interceptors.request.use((reqConfig) => {
  if (reqConfig.headers) {
    reqConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return reqConfig;
});

api.interceptors.response.use(resConfig => resConfig, async (err) => {
  if (err.response.status === 401 && !err.config.retried) {
    err.config.retried = true;
    const response = await axios.get<SuccessCreateBody>(
      `${baseURL}/refresh`, {
      withCredentials: true,
      params: { userAgent: getUserAgent() }
    });
    localStorage.setItem('token', response.data.accessToken);
    return api.request(err.config);
  }
  throw err;
});