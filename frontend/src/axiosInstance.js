import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-app-81lx.onrender.com/",
  withCredentials: true,
});

export default instance;
