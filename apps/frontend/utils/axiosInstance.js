import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_SERVER_URL
    : process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

export default instance;
