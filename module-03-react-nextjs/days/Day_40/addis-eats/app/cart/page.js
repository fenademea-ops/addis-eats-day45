import { AuthGate } from "@/components/AuthGate";
import { CartClient } from "@/components/CartClient";

export default function CartPage() {
  return (
    <AuthGate redirectTo="/cart">
      <CartClient />
    </AuthGate>
  );
}
