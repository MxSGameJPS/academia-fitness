import { create } from "zustand";
import { persist } from "zustand/middleware";

// Dados de exemplo do aluno
const studentData = {
  id: 1,
  name: "Lucas Silva",
  username: "ALUNO123",
  password: "123ALUNO",
  email: "lucas.silva@exemplo.com",
  phone: "(11) 99999-8888",
  birthDate: "1995-06-15",
  plan: "Premium",
  planStartDate: "2023-01-10",
  planEndDate: "2023-12-10",
  photo:
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3",
  address: {
    street: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
  },
  measurements: [
    {
      date: "2023-10-15",
      weight: 78.5,
      height: 1.82,
      bmi: 23.7,
      bodyFat: 15.2,
      chest: 98,
      waist: 82,
      arms: 32,
      legs: 60,
    },
    {
      date: "2023-11-15",
      weight: 77.2,
      height: 1.82,
      bmi: 23.3,
      bodyFat: 14.5,
      chest: 99,
      waist: 80,
      arms: 33,
      legs: 61,
    },
  ],
  workouts: [
    {
      id: 1,
      name: "Treino A - Peito e Tríceps",
      day: "Segunda-feira",
      exercises: [
        {
          name: "Supino Reto",
          sets: 4,
          reps: "12, 10, 8, 8",
          weight: "30, 40, 45, 45",
        },
        {
          name: "Supino Inclinado",
          sets: 3,
          reps: "12, 10, 8",
          weight: "25, 30, 35",
        },
        {
          name: "Crucifixo",
          sets: 3,
          reps: "12, 12, 12",
          weight: "16, 16, 16",
        },
        {
          name: "Tríceps Corda",
          sets: 4,
          reps: "15, 12, 12, 10",
          weight: "25, 30, 30, 35",
        },
        {
          name: "Tríceps Francês",
          sets: 3,
          reps: "12, 10, 10",
          weight: "15, 17.5, 17.5",
        },
      ],
    },
    {
      id: 2,
      name: "Treino B - Costas e Bíceps",
      day: "Quarta-feira",
      exercises: [
        {
          name: "Puxada Frontal",
          sets: 4,
          reps: "12, 10, 8, 8",
          weight: "50, 60, 70, 70",
        },
        {
          name: "Remada Curvada",
          sets: 3,
          reps: "12, 10, 8",
          weight: "40, 45, 50",
        },
        {
          name: "Remada Unilateral",
          sets: 3,
          reps: "10, 10, 10",
          weight: "20, 20, 20",
        },
        {
          name: "Rosca Direta",
          sets: 4,
          reps: "12, 10, 8, 8",
          weight: "15, 17.5, 20, 20",
        },
        {
          name: "Rosca Alternada",
          sets: 3,
          reps: "12, 10, 10",
          weight: "12, 14, 14",
        },
      ],
    },
    {
      id: 3,
      name: "Treino C - Pernas e Ombros",
      day: "Sexta-feira",
      exercises: [
        {
          name: "Agachamento",
          sets: 4,
          reps: "12, 10, 8, 8",
          weight: "50, 60, 70, 70",
        },
        {
          name: "Leg Press",
          sets: 3,
          reps: "12, 10, 8",
          weight: "120, 150, 180",
        },
        {
          name: "Cadeira Extensora",
          sets: 3,
          reps: "15, 12, 12",
          weight: "40, 45, 45",
        },
        {
          name: "Desenvolvimento",
          sets: 4,
          reps: "12, 10, 8, 8",
          weight: "20, 25, 30, 30",
        },
        {
          name: "Elevação Lateral",
          sets: 3,
          reps: "12, 12, 12",
          weight: "10, 10, 10",
        },
      ],
    },
  ],
};

export const useStudentStore = create(
  persist(
    (set, get) => ({
      student: null,
      isAuthenticated: false,
      error: null,

      // Login de aluno
      login: (username, password) => {
        // Verificar credenciais do aluno de exemplo
        if (
          username === studentData.username &&
          password === studentData.password
        ) {
          set({
            student: studentData,
            isAuthenticated: true,
            error: null,
          });
          return true;
        }

        set({ error: "Usuário ou senha inválidos" });
        return false;
      },

      // Logout de aluno
      logout: () => {
        set({
          student: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Limpar erro
      clearError: () => {
        set({ error: null });
      },

      // Atualizar dados do aluno
      updateStudent: (data) => {
        set({
          student: { ...get().student, ...data },
        });
      },
    }),
    {
      name: "student-storage", // Nome para salvar no localStorage
    }
  )
);
