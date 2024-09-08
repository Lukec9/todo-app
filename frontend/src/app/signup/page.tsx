"use client";

import React, { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

function Signup() {
  const { signup } = useAuthContext();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      signup(email, username, password);
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Login failed:", error.response?.data);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus-within:outline-none focus:ring-2 ring-green-400"
          />
        </div>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus-within:outline-none focus:ring-2 ring-green-400"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus-within:outline-none focus:ring-2 ring-green-400"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 rounded-lg text-lg hover:bg-[#57ba98] transition duration-300  text-white"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
