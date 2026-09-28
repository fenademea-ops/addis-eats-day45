"use client";

import { CartProvider } from "@/lib/cart-store";

export function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
