import { createContext, useContext, useMemo, useCallback } from "react";
import { useCartStore } from "../cart/cartStore";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalInETB = useMemo(() => {
    return items.reduce((sum, item) => {
      const quantity = Number(item?.quantity) || 1;
      const price = Number(item?.price) || 0;
      return sum + price * quantity;
    }, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((count, item) => count + (Number(item?.quantity) || 1), 0);
  }, [items]);

  const dispatch = useCallback((action) => {
    switch (action.type) {
      case "ADD_ITEM":
        addItem(action.dish);
        return;
      case "REMOVE_ITEM":
        removeItem(action.id);
        return;
      case "CLEAR_CART":
        clearCart();
        return;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }, [addItem, removeItem, clearCart]);

  const value = useMemo(
    () => ({
      items,
      totalInETB,
      itemCount,
      addItem,
      removeItem,
      clearCart,
      dispatch,
    }),
    [items, totalInETB, itemCount, addItem, removeItem, clearCart, dispatch]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}