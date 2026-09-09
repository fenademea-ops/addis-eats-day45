import { create } from "zustand";

const STORAGE_KEY = "addis-eats-dishes";

export const useMenuStore = create((set) => ({
  dishes: [],
  loading: false,
  error: null,

  loadDishes: async () => {
    set({ loading: true, error: null });

    try {
      // 1. Check localStorage first
      const savedDishes = localStorage.getItem(STORAGE_KEY);

      if (savedDishes) {
        set({
          dishes: JSON.parse(savedDishes),
          loading: false,
        });

        return;
      }

      // 2. No saved data, so seed from menu-data.json
      const response = await fetch("/menu-data.json");

      if (!response.ok) {
        throw new Error("Failed to load menu data");
      }

      const dishes = await response.json();

      // 3. Save the seed data to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));

      // 4. Put the data into Zustand
      set({
        dishes,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Failed to load menu.",
        loading: false,
      });
    }
  },
}));