import { Link } from "react-router-dom";

import { useCartStore } from "../stores/cartStore.js";

function CartPanel() {
  const count = useCartStore((state) => state.cart.reduce((total, item) => total + item.quantity, 0));
  return <aside className="cart-panel"><strong>{count} items in your cart</strong><Link to="/cart">View cart</Link></aside>;
}

export default CartPanel;