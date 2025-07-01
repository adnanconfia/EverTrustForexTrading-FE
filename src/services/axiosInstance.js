// src/api/axiosInstance.js
import axios from "axios";
import { API_URL } from "../config";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

let isLoggingOut = false; // Flag to prevent redirect loop

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect once
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
