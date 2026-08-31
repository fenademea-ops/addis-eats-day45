import { useState } from "react";
import { dishes } from "./data";
import { CategoryBar } from "./CategoryBar";
import { DishList } from "./DishList";
import { OrderForm } from "./OrderForm";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [totalAmount, setTotalAmount] = useState(0);

  const categories = ["All", "Main", "Vegan", "Grill"];
  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((d) => d.category === selectedCategory);

  return (
    <div className="menu-container">
      <h2 className="menu-header">Addis Eats Interactive Menu</h2>

      <CategoryBar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="total-banner">
        <span>Current Order Total:</span>
        <span className="total-amount">{totalAmount.toFixed(2)} ETB</span>
      </div>

      <DishList dishes={filteredDishes} onAddToCart={(p) => setTotalAmount(t => t + p)} />

      <OrderForm totalAmount={totalAmount} onOrderComplete={() => setTotalAmount(0)} />
    </div>
  );
}