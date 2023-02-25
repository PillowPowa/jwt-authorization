import axios from "axios";

export const baseURL = "http://localhost:7000/api";
export const api = axios.create({
  withCredentials: true, baseURL
});

api.interceptors.request.use((reqConfig) => {
  reqConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return reqConfig;
});