import { headers } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  // The request headers identify the delivery zone, so checkout must render per request.
  const requestHeaders = await headers();
  const deliveryZone = requestHeaders.get("x-delivery-zone") || "Addis Ababa";

  return <main className="shell simple-page"><Link className="back-link" href="/cart">&larr; Back to cart</Link><h1>Checkout</h1><form className="checkout-form"><p className="zone-note">Delivering to <strong>{deliveryZone}</strong></p><label>Name<input type="text" placeholder="Your name" /></label><label>Delivery address<input type="text" placeholder="Where should we deliver?" /></label><button className="button" type="submit">Place order</button></form></main>;
}