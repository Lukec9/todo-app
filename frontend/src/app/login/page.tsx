"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";

function Input({
  type,
  value,
  onChange,
  placeholder,
}: {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 text-lg border rounded-md mb-4 focus:ring-2 focus-within:outline-none focus:ring-green-400"
    />
  );
}

function Button({
  type,
  disabled,
  children,
}: {
  type: "submit" | "button";
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full p-3 text-lg bg-emerald-500 text-white rounded-md  transition"
    >
      {children}
    </button>
  );
}

export default function LoginForm() {
  const {
    login,
    state: { loading },
  } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="login-form max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div>
          <Button disabled={loading} type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
