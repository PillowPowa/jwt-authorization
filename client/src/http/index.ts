import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:7000/api"
});

api.interceptors.request.use((reqConfig) => {
  reqConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return reqConfig;
});