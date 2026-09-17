import { create } from "zustand";
import { fetchDishes } from "../api/dishes.js";

const STORAGE_KEY = "addis-eats-dishes";

function wait(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useMenuStore = create((set) => ({
  dishes: [],
  loading: false,
  error: null,

  loadDishes: async () => {
    set({ loading: true, error: null });

    try {
      const savedDishes = localStorage.getItem(STORAGE_KEY);

      if (savedDishes) {
        const dishes = JSON.parse(savedDishes);

        await wait(350);

        set({
          dishes,
          loading: false,
          error: null,
        });

        return;
      }

      const dishes = await fetchDishes();

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));

      await wait(350);

      set({
        dishes,
        loading: false,
        error: null,
      });
    } catch {
      set({
        error: "Failed to load menu.",
        loading: false,
      });
    }
  },

  saveDish(dish) {
    set((state) => {
      const existingIndex = state.dishes.findIndex((entry) => entry.id === dish.id);

      const nextDishes = existingIndex >= 0
        ? state.dishes.map((entry) => entry.id === dish.id ? dish : entry)
        : [...state.dishes, dish];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDishes));

      return {
        dishes: nextDishes,
      };
    });
  },

  updateDish(dish) {
    set((state) => {
      const nextDishes = state.dishes.map((entry) =>
        entry.id === dish.id ? dish : entry
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDishes));

      return {
        dishes: nextDishes,
      };
    });
  },

  deleteDish(dishId) {
    set((state) => {
      const nextDishes = state.dishes.filter((dish) => dish.id !== dishId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDishes));

      return {
        dishes: nextDishes,
      };
    });
  },
}));