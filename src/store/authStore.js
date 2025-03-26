import { create } from "zustand";
import { persist } from "zustand/middleware";

// Credenciais fixas para este exemplo
const VALID_USERNAME = "ADM554";
const VALID_PASSWORD = "ADM1234";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      username: null,
      error: null,

      login: (username, password) => {
        // Verificar credenciais
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
          set({
            isAuthenticated: true,
            username: username,
            error: null,
          });
          return true;
        } else {
          set({
            error: "Usuário ou senha inválidos",
          });
          return false;
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          username: null,
          error: null,
        });
      },

      clearError: () => {
        set({
          error: null,
        });
      },
    }),
    {
      name: "auth-storage", // nome para o localStorage
    }
  )
);
