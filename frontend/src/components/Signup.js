import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

function Signup() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          email,
          username,
          password,
        }
      );
      console.log("Login successful:", response.data);
      login(response.data.user); // Save user data to context
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="signup-input"
            style={{ width: "100%", padding: "12px", fontSize: "16px" }}
          />
        </div>
        <div>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="signup-input"
            style={{ width: "100%", padding: "12px", fontSize: "16px" }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="signup-input"
            style={{ width: "100%", padding: "12px", fontSize: "16px" }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn"
            style={{ width: "100%", padding: "12px", fontSize: "16px" }}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
