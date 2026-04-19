import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../utils/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/login", { email, password });

          if (response.data.success) {
            const { token, user } = response.data;

            // Save to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Update store
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });

            return { success: true, user };
          }
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error.response?.data?.error || "Login failed",
          };
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/register", userData);

          if (response.data.success) {
            const { token, user } = response.data;

            // Save to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Update store
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });

            return { success: true, user };
          }
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error.response?.data?.error || "Registration failed",
          };
        }
      },

      logout: () => {
        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Reset store
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateProfile: async (profileData) => {
        try {
          const response = await api.put("/auth/profile", profileData);

          if (response.data.success) {
            const { user } = response.data;
            localStorage.setItem("user", JSON.stringify(user));
            set({ user });
            return { success: true, user };
          }
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.error || "Update failed",
          };
        }
      },

      // Check and restore auth state
      checkAuth: () => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({
              user,
              token,
              isAuthenticated: true,
            });
            return true;
          } catch (e) {
            console.error("Failed to parse user data");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      // Skip persistence for token and user since we handle it manually
      partialize: (state) => ({}),
    },
  ),
);

// Check auth immediately when store is created
useAuthStore.getState().checkAuth();

// Also listen for storage changes (for multi-tab support)
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "token" || e.key === "user") {
      useAuthStore.getState().checkAuth();
    }
  });
}

export default useAuthStore;
