"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = window.localStorage.getItem("addis-eats-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("addis-eats-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (dish) => {
    setCart((current) => {
      const found = current.find((item) => item.id === dish.id);
      if (found) {
        return current.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCart((current) => current.filter((item) => item.id !== dishId));
  };

  const clearCart = () => setCart([]);

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, clearCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
