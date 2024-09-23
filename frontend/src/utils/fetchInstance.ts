"use server";

import { cookies } from "next/headers";

const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "/api";
// : process.env.NEXT_PUBLIC_API_URL;

const fetchInstance = async (
  url: string,
  options: RequestInit = {},
  timeout = 15000
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const cookieStore = cookies();
  const csrfToken = cookieStore.get("csrfToken")?.value;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Cookie: cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; "),
  };

  if (csrfToken) {
    defaultHeaders["X-CSRF-Token"] = csrfToken;
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    signal: controller.signal,
    credentials: "include",
  };

  try {
    const response = await fetch(API_URL + url, mergedOptions);

    clearTimeout(timeoutId);

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      if (contentType?.includes("application/json")) {
        const errorData = await response.json();
        return {
          data: null,
          error: errorData.message || errorData.error || "Unknown error",
        };
      } else {
        return { data: null, error: "An unknown error occurred" };
      }
    }

    if (contentType?.includes("application/json")) {
      return { data: await response.json(), error: null };
    } else {
      return { data: await response.text(), error: null };
    }
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      return { data: null, error: "Request timed out" };
    }

    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export default fetchInstance;
