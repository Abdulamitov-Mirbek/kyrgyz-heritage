import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import useAuthStore from "./store/authStore.js";
import "./index.css";
import "./i18n.js";

const queryClient = new QueryClient();

// Initialize auth state from localStorage BEFORE rendering
const initializeAuth = () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      useAuthStore.setState({
        user,
        token,
        isAuthenticated: true,
      });
      console.log("✅ Auth initialized from localStorage");
    } catch (e) {
      console.error("Failed to parse user data:", e);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
};

initializeAuth();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
