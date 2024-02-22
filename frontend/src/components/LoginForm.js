import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true, // Include cookies
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      login(response.data.user);
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
