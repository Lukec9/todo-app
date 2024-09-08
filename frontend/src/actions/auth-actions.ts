"use server";

import axiosInstance from "@/utils/axiosInstance";
import type { TodoExtended } from "@shared/types";
import { AxiosError } from "axios";

export async function fetchUser() {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data || null;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching user:", error.response?.data);
    }
    return null;
  }
}

export async function login(username: string, password: string) {
  try {
    const response = await axiosInstance.post("/users/login", {
      username,
      password,
    });
    return response.data.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Login error:", error.response?.data);
    }
  }
}

export async function signup(email: string, username: string, password: string) {
  try {
    const response = await axiosInstance.post("/users/register", {
      email,
      username,
      password,
    });
    return response.data.user;
  } catch (error) {
    console.error("Signup error:", error);
  }
}

export async function logout() {
  try {
    await axiosInstance.post("/users/logout");
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export async function getUserTodos(userId: string): Promise<TodoExtended[]> {
  try {
    const response = await axiosInstance.get(`/users/${userId}/todos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user todos:", error);
    return [];
  }
}
