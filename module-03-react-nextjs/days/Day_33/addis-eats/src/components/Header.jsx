import CartBadge from "./CartBadge";
import ThemeToggle from "./ThemeToggle";

export default function Header({ onOpenCart }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <h1>🇪🇹 Addis Eats</h1>
      </div>
      <div className="header-actions">
        <ThemeToggle />
        <CartBadge onClick={onOpenCart} />
      </div>
    </header>
  );
}