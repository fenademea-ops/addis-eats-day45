import { Link } from "react-router-dom";

import { useCartStore } from "../stores/cartStore.js";

function CartBadge() {
  const count = useCartStore((state) => state.cart.reduce((total, item) => total + item.quantity, 0));
  return <Link className="cart-badge" to="/cart" aria-label={`Cart with ${count} items`}>{count}</Link>;
}

export default CartBadge;