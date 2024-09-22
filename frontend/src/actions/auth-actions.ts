"use server";

import fetchInstance from "@/utils/fetchInstance";
import type { TodoExtended } from "@shared/types";
import { redirect } from "next/navigation";

export async function fetchUser() {
  try {
    const response = await fetchInstance("/users/me", {
      method: "GET",
    });
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      "Error fetching user:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

export async function login(username: string, password: string) {
  try {
    const response = await fetchInstance("/users/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.data) {
      return response.data.user;
    } else {
      return response.error;
    }
  } catch (error) {
    console.error("Login error:", error instanceof Error ? error.message : error);
    return null;
  }
}

export async function logout() {
  let redirectTo = "/";
  try {
    const response = await fetchInstance("/users/logout", {
      method: "POST",
    });
    if (response.data) {
      redirectTo = "/";
      return response;
    } else {
      redirectTo = "/dashboard";
      return response;
    }
  } catch (error) {
    console.error("Logout error:", error instanceof Error ? error.message : error);
    redirectTo = "/dashboard";
  } finally {
    redirect(redirectTo);
  }
}

export async function getUserTodos(userId: string): Promise<TodoExtended[]> {
  try {
    const response = await fetchInstance(`/users/${userId}/todos`, {
      method: "GET",
    });
    if (response.data) {
      return response.data;
    } else {
      return response.error;
    }
  } catch (error) {
    console.error(
      "Error fetching user todos:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}
