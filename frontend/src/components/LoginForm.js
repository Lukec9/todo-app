import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../axiosInstance";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!username || !password) {
        return;
      }
      const response = await axios.post("/api/users/login", {
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
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
            style={{ width: "100%", padding: "12px", fontSize: "16px" }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
            style={{ width: "100%", padding: "12px", fontSize: "16px" }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn"
            style={{ width: "100%", padding: "12px", fontSize: "16px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
