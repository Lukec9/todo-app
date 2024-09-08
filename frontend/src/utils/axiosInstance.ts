import axios from "axios";
import { cookies } from "next/headers";

const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000/api/" : "/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor to include cookies
axiosInstance.interceptors.request.use(
  (config) => {
    // Extract cookies and format them
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    // Add cookies to the request headers
    if (config.headers) {
      config.headers["Cookie"] = cookieHeader;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
