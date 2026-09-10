import { create } from "zustand";

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

      const response = await fetch("/menu-data.json");

      if (!response.ok) {
        throw new Error("Failed to load menu data");
      }

      const dishes = await response.json();

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));

      await wait(350);

      set({
        dishes,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: "Failed to load menu.",
        loading: false,
      });
    }
  },
}));