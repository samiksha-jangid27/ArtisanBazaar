import axios from "axios";

const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";

const BASE_URL = isLocal
  ? process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL
  : process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

// Attach JWT
instance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
