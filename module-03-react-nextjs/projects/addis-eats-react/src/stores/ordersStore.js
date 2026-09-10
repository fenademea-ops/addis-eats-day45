import { create } from "zustand";

const STORAGE_KEY = "addis-eats-orders";

function readOrders() {
  try {
    const savedOrders = localStorage.getItem(STORAGE_KEY);

    if (!savedOrders) {
      return [];
    }

    return JSON.parse(savedOrders);
  } catch (error) {
    return [];
  }
}

export const useOrdersStore = create((set) => ({
  orders: readOrders(),

  addOrder(order) {
    set((state) => {
      const nextOrders = [order, ...state.orders];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrders));

      return {
        orders: nextOrders,
      };
    });
  },
}));
