// provides a centralized Axios instance so all frontend API
// communication follows the same configuration and interceptor policies."

import axios from "axios";
import { env } from "../config/env";
import { tokenStorage } from "../../features/auth/storage/tokenStorage";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
  const isAuthRequest = config.url?.startsWith("/auth/");

  if (!isAuthRequest) {
    const token = tokenStorage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
