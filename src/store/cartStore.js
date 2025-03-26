import { create } from "zustand";
import { persist } from "zustand/middleware";

// Dados de exemplo para o carrinho
const initialCartItems = [
  /*
  {
    id: 1,
    name: "Whey Protein Isolado",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1617886322168-72b886573c5f?ixlib=rb-4.0.3",
    quantity: 1
  }
  */
];

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: initialCartItems,

      // Adicionar um item ao carrinho
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          // Se o item já existe, aumenta a quantidade
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          // Se o item não existe, adiciona com quantidade 1
          set({
            items: [...currentItems, { ...item, quantity: 1 }],
          });
        }
      },

      // Remover um item do carrinho
      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },

      // Atualizar a quantidade de um item
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          // Se a quantidade for 0 ou menor, remove o item
          get().removeItem(itemId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      // Limpar o carrinho
      clearCart: () => {
        set({ items: [] });
      },

      // Calcular o total do carrinho
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Contar itens no carrinho
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage", // Nome para salvar no localStorage
    }
  )
);
