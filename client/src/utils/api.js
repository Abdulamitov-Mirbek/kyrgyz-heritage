import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't show toast for login/register pages
    const isAuthPage =
      window.location.pathname.includes("/login") ||
      window.location.pathname.includes("/register");

    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login if not already on auth page
      if (!isAuthPage) {
        window.location.href = "/login";
      }
      toast.error("Please login to continue");
    } else if (error.response?.status === 500) {
      toast.error("Server error. Please try again.");
    } else if (!isAuthPage) {
      const message = error.response?.data?.error || "Something went wrong";
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default api;
