const api =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : process.env.API_URL;

export const getCsrfToken = async () => {
  try {
    await fetch(`${api}/csrf-token`, {
      credentials: "include",
    });
  } catch (error) {
    console.error("CSRF token error:", error);
  }
};
