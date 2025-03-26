import { create } from "zustand";
import { persist } from "zustand/middleware";

// Função para carregar dados iniciais
const loadInitialContacts = () => {
  return [
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@exemplo.com",
      phone: "(11) 98765-4321",
      subject: "Informações sobre planos",
      message:
        "Olá, gostaria de saber mais sobre os planos de assinatura disponíveis.",
      date: "2023-05-15T10:30:00.000Z",
      status: "Respondido",
    },
    {
      id: 2,
      name: "Carlos Santos",
      email: "carlos.santos@exemplo.com",
      phone: "(21) 99876-5432",
      subject: "Agendar uma visita",
      message: "Gostaria de agendar uma visita para conhecer a academia.",
      date: "2023-05-18T14:45:00.000Z",
      status: "Novo",
    },
    {
      id: 3,
      name: "Mariana Costa",
      email: "mariana.costa@exemplo.com",
      phone: "(31) 98765-1234",
      subject: "Personal Trainer",
      message:
        "Estou interessada em contratar um personal trainer. Quais são as opções disponíveis?",
      date: "2023-05-20T09:15:00.000Z",
      status: "Em andamento",
    },
  ];
};

export const useContactStore = create(
  persist(
    (set) => ({
      contacts: loadInitialContacts(),

      addContact: (newContact) =>
        set((state) => ({
          contacts: [...state.contacts, newContact],
        })),

      updateContactStatus: (id, status) =>
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id ? { ...contact, status } : contact
          ),
        })),

      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((contact) => contact.id !== id),
        })),

      clearContacts: () => set({ contacts: [] }),
    }),
    {
      name: "contact-storage", // nome para o localStorage
    }
  )
);
