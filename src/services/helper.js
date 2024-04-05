import axios from "axios";

export const BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}`;

export const workAxios = axios.create({
  baseURL: BASE_URL,
});
