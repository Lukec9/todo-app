"use server";

import fetchInstance from "@/utils/fetchInstance";
import type { TodoExtended } from "@shared/types";

export async function fetchUser() {
  try {
    const response = await fetchInstance("/users/me", {
      method: "GET",
    });
    console.log(response, "resonse in fetchUser action");
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
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
      return { data: response.data, redirectTo };
    } else {
      redirectTo = "/dashboard";
      return {
        data: null,
        error: response.error || "An unknown error occurred",
        redirectTo,
      };
    }
  } catch (error) {
    redirectTo = "/dashboard";
    return { data: null, error: "Something went wrong", redirectTo };
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
    return [];
  }
}
