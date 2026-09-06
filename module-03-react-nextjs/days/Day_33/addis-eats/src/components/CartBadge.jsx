import { useCartStore } from "../cart/cartStore";

export default function CartBadge({ onOpen, onClick }) {
  const itemCount = useCartStore((state) => state.items.length);
  const handleOpen = onOpen ?? onClick;

  return (
    <button type="button" className="cart-badge-btn" onClick={handleOpen}>
      🛒 Cart <span className="badge-count">{itemCount}</span>
    </button>
  );
}