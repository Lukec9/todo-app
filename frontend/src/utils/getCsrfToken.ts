import axios from "axios";

export const getCsrfToken = async () => {
  try {
    await axios.get("http://localhost:5000/api/csrf-token", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("CSRF token error:", error);
  }
};
