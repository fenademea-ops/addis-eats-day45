import { create } from "zustand";

const STORAGE_KEY = "addis-eats-favorites";

function readFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!savedFavorites) {
      return [];
    }

    return JSON.parse(savedFavorites);
  } catch (error) {
    return [];
  }
}

export const useFavoritesStore = create((set) => ({
  favorites: readFavorites(),

  toggleFavorite(dishId) {
    set((state) => {
      const currentFavorites = state.favorites;
      const isFavorite = currentFavorites.includes(dishId);

      const nextFavorites = isFavorite
        ? currentFavorites.filter((id) => id !== dishId)
        : [...currentFavorites, dishId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));

      return {
        favorites: nextFavorites,
      };
    });
  },
}));
