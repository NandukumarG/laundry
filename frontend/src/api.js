import axios from "axios";

export const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/$/, "");
const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });
export const assetUrl = (path) => path ? `${API_BASE_URL}${path}` : null;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.endsWith("/login")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      window.location.replace("/Login");
    }
    return Promise.reject(error);
  }
);

export default api;
