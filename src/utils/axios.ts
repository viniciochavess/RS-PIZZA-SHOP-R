import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
  baseURL: `${env.VITE_API_URL}`,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    if (env.VITE_ENABLE_API_DELAY) {
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
