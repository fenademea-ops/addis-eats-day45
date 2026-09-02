import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Menu from "./Menu";
import CartPanel from "./components/CartPanel";
import "./App.css";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app-container">
          <Header onOpenCart={() => setIsCartOpen(true)} />
          <main>
            <Menu />
          </main>
          <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}