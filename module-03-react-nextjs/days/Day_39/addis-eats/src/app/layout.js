import Link from "next/link";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian comfort food, made for sharing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="site-header">
            <div className="shell header-inner">
              <Link href="/" className="brand">Addis Eats <small>Taste the highlands</small></Link>
              <nav className="main-nav" aria-label="Main navigation">
                <Link href="/menu">Menu</Link>
                <Link href="/orders">Orders</Link>
                <Link href="/checkout">Checkout</Link>
              </nav>
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
