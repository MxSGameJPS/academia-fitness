import { create } from "zustand";
import { persist } from "zustand/middleware";

// Dados de exemplo do administrador
const adminData = {
  id: 1,
  name: "Admin",
  username: "ADM554",
  password: "ADM1234",
  email: "admin@powerfit.com",
  role: "administrator",
  photo: "/images/admin-avatar.jpg",
};

export const useAdminStore = create(
  persist(
    (set, get) => ({
      admin: null,
      isAuthenticated: false,
      error: null,

      // Login
      login: (username, password) => {
        // Validando o login com os dados de exemplo
        if (
          username === adminData.username &&
          password === adminData.password
        ) {
          set({
            admin: adminData,
            isAuthenticated: true,
            error: null,
          });
          return true;
        } else {
          set({
            error: "Nome de usuário ou senha inválidos",
          });
          return false;
        }
      },

      // Logout
      logout: () => {
        set({
          admin: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Limpar mensagens de erro
      clearError: () => {
        set({
          error: null,
        });
      },

      // Atualizar dados do administrador
      updateAdmin: (data) => {
        set({
          admin: {
            ...get().admin,
            ...data,
          },
        });
      },
    }),
    {
      name: "admin-storage", // nome usado para o localStorage
    }
  )
);
