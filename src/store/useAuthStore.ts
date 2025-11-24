import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { HttpStatusCode } from "axios";
import type { User } from "../constants/types";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  logIn: (
    username: string,
    password: string
  ) => Promise<{
    user: User;
    accessToken: string;
  }>;

  logOut: () => Promise<void>;

  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;

  loadFromSession: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      logIn: async (username, password) => {
        const res = await axiosInstance.post(`/auth/login`, {
          username,
          password,
        });
        console.log("res data", res);
        
        if (res.status === HttpStatusCode.Ok) {
          const { accessToken, user } = res.data;
          set({
            user,
            accessToken: accessToken, // Map the typo to our correct field name
            isAuthenticated: true,
          });
        }
        console.log("res data", res);
        
        return res.data; // Return the user data, accessToken, and refreshToken
      },

      logOut: async () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },

      register: async (email, username, password) => {
        const res = await axiosInstance.post("/auth/register", {
          email,
          username,
          password,
        });
        return res.data;
      },

      loadFromSession: () => {
        // This is now handled by Zustand persist middleware automatically
        // No need for manual localStorage operations
        set({ isLoading: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
