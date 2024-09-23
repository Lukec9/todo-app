"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { type = "text", value, onChange, placeholder, className = "", ...props },
    ref
  ) => {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        ref={ref}
        placeholder={placeholder}
        className={`w-full p-3 text-lg border bg-transparent rounded-md mb-4 focus:ring-2 focus-within:outline-none focus:ring-green-400 border-emerald-500 text-white/75 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

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
      className="w-full p-3 text-white rounded-md bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus-within:outline-none focus:ring-green-400"
    >
      {children}
    </button>
  );
}

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const router = useRouter();
  const {
    login,
    state: { loading },
  } = useAuthContext();
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const result = await trigger();
    if (!result) return;

    const data = getValues();

    const { success, error: loginError } = await login(data.username, data.password);
    if (!success) {
      setError(loginError || "Something went wrong");
      return;
    }
    setError(null);
    router.push("/");
  };

  return (
    <main className="flex items-center justify-center pt-8 overflow-hidden transition-all duration-300 md:pt-24">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xl p-6 mx-auto space-y-4 bg-gray-900 border rounded-lg shadow-md border-emerald-500"
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-emerald-500">
          Login
        </h2>
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-white">
            Username
          </label>
          <Input
            type="text"
            {...register("username")}
            id="username"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <Input
            type="password"
            {...register("password")}
            id="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="mt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </main>
  );
}
