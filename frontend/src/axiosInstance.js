import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your base URL
  withCredentials: true, // This will send cookies with cross-origin requests
  // Add any other default configurations here
});

export default instance;
