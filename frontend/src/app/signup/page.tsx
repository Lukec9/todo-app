"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Invalid email"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function PasswordStrength({ passwordStrength }: { passwordStrength: number }) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-emerald-500",
  ];
  const textColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
    "text-emerald-500",
  ];
  const labels = ["Weak", "Okay", "Good", "Strong", "Perfect"];

  return (
    <div className="relative">
      <div className="w-full  bg-emerald-200 rounded-full h-2">
        <div
          style={{ width: `${passwordStrength * 20}%` }}
          className={`h-2 ${colors[passwordStrength - 1]}`}
        ></div>
      </div>
      <div>
        <p
          className={`text-sm ${textColors[passwordStrength - 1]} ${
            passwordStrength === 0 ? "text-red-500" : ""
          }`}
        >
          {labels[passwordStrength]}
        </p>
      </div>
    </div>
  );
}

function Signup() {
  const { signup } = useAuthContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const passwordStrengthMeter = (password: string) => {
    let strength = 0;

    if (password.length >= 8) {
      strength += 1;
    }

    if (/[A-Z]/.test(password)) {
      strength += 1;
    }

    if (/[a-z]/.test(password)) {
      strength += 1;
    }

    if (/[0-9]/.test(password)) {
      strength += 1;
    }

    if (/[!@#$%^&*]/.test(password)) {
      strength += 1;
    }

    setPasswordStrength(strength);
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const { success, error: signupError } = await signup(
        data.email,
        data.username,
        data.password
      );
      if (!success) {
        setError(signupError || "Something went wrong");
        return;
      }
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 md:mt-12 border border-emerald-500 bg-gray-900 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-emerald-500">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-emerald-500/80" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 text-white/75 text-lg border-emerald-500 border bg-transparent rounded-lg focus:ring-2 focus-within:outline-none focus:ring-green-400"
            id="email"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-emerald-500/80" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            placeholder="Username"
            className="w-full p-3 text-white/75 text-lg border-emerald-500 border bg-transparent rounded-lg focus:ring-2 focus-within:outline-none focus:ring-green-400"
            id="username"
          />
          {errors.username?.message && (
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-emerald-500/80" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            onChange={(e) => passwordStrengthMeter(e.target.value)}
            className="w-full p-3 text-white/75 text-lg border-emerald-500 border bg-transparent rounded-lg focus:ring-2 focus-within:outline-none focus:ring-green-400"
            id="password"
          />
          {errors.password?.message && (
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <PasswordStrength passwordStrength={passwordStrength} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="space-y-2">
          <button
            disabled={passwordStrength < 3}
            type="submit"
            className="w-full py-3 bg-emerald-500 rounded-lg text-lg hover:bg-emerald-600 transition duration-300  text-white/75 disabled:bg-emerald-300 disabled:text-white/75 disabled:cursor-not-allowed disabled:hover:bg-emerald-300"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
