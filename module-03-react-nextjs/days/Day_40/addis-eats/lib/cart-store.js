"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "addis-eats-cart";
const EMPTY_ITEMS = [];
const CartContext = createContext(null);
const listeners = new Set();
let cachedStorageValue;
let cachedItems = EMPTY_ITEMS;

function getCartSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_ITEMS;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === cachedStorageValue) {
    return cachedItems;
  }

  cachedStorageValue = saved;
  if (!saved) {
    cachedItems = EMPTY_ITEMS;
    return cachedItems;
  }

  try {
    const parsed = JSON.parse(saved);
    cachedItems = Array.isArray(parsed) ? parsed : EMPTY_ITEMS;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    cachedStorageValue = null;
    cachedItems = EMPTY_ITEMS;
  }

  return cachedItems;
}

function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function updateCart(update) {
  const nextItems = update(getCartSnapshot());
  const serialized = JSON.stringify(nextItems);
  window.localStorage.setItem(STORAGE_KEY, serialized);
  cachedStorageValue = serialized;
  cachedItems = nextItems;
  listeners.forEach((listener) => listener());
}

export function CartProvider({ children }) {
  const items = useSyncExternalStore(subscribe, getCartSnapshot, () => EMPTY_ITEMS);

  const addItem = (dish) => {
    updateCart((current) => {
      const existing = current.find((item) => item.id === dish.id);
      if (existing) {
        return current.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...current,
        {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          category: dish.category,
          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (id) => {
    updateCart((current) => current.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    updateCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    updateCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => updateCart(() => EMPTY_ITEMS);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return {
      items,
      itemCount,
      total,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
