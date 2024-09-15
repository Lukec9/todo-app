import axios from "axios";
import { cookies } from "next/headers";

const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000/api/" : "/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookieStore = cookies();
    const csrfToken = cookieStore.get("csrfToken")?.value;

    if (config.headers) {
      config.headers["Cookie"] = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
