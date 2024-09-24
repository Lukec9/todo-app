const api =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : process.env.NEXT_PUBLIC_API_URL;

export const getCsrfToken = async () => {
  try {
    await fetch(`${api}/csrf-token`, {
      credentials: "include",
      cache: "no-store",
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
