import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || "";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

export default instance;
