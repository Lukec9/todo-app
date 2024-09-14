"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";
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
        className={`w-full p-3 text-lg border rounded-md mb-4 focus:ring-2 focus-within:outline-none focus:ring-green-400 ${className}`}
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
      className="w-full p-3 text-lg bg-emerald-500 text-white rounded-md  transition"
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

  return (
    <div className="login-form max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form
        action={async () => {
          const result = await trigger();
          if (!result) return;

          const data = getValues();

          await login(data.username, data.password);
          router.push("/");
        }}
      >
        <div>
          <Input type="text" {...register("username")} placeholder="Username" />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div>
          <Input type="password" {...register("password")} placeholder="Password" />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
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
