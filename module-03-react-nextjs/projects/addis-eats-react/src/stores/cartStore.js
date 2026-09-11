import { create } from "zustand";

const STORAGE_KEY = "addis-eats-cart";

function readCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    return JSON.parse(savedCart);
  } catch (error) {
    return [];
  }
}

export const useCartStore = create((set) => ({
  cart: readCart(),
  toast: null,

  syncCartWithMenu(dishes = []) {
    set((state) => {
      const nextCart = state.cart.filter((item) => {
        const dish = dishes.find((entry) => entry.id === item.id);
        return Boolean(dish && dish.available);
      });

      if (nextCart.length !== state.cart.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));
      }

      return {
        cart: nextCart,
      };
    });
  },

  addDish(dish) {
    set((state) => {
      const existing = state.cart.find((item) => item.id === dish.id);

      const nextCart = existing
        ? state.cart.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { id: dish.id, quantity: 1 }];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));

      return {
        cart: nextCart,
        toast: {
          dishName: dish.name,
          quantity: 1,
        },
      };
    });

    window.setTimeout(() => {
      set({ toast: null });
    }, 900);
  },

  dismissToast() {
    set({ toast: null });
  },

  removeDish(dishId) {
    set((state) => {
      const nextCart = state.cart.filter((item) => item.id !== dishId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));

      return {
        cart: nextCart,
      };
    });
  },

  updateQuantity(dishId, quantity) {
    set((state) => {
      if (quantity <= 0) {
        return {
          cart: state.cart.filter((item) => item.id !== dishId),
        };
      }

      const nextCart = state.cart.map((item) =>
        item.id === dishId ? { ...item, quantity } : item
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));

      return {
        cart: nextCart,
      };
    });
  },

  clearCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

    set({ cart: [], toast: null });
  },
}));
