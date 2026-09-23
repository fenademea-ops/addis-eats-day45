import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian comfort food, made for sharing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link href="/" className="brand" aria-label="Addis Eats home">
              <span className="brand-mark">AE</span>
              <span><strong>Addis Eats</strong><small>Taste the highlands</small></span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/menu">Menu</Link>
              <Link className="nav-cta" href="/cart">Cart <span aria-hidden="true">&rarr;</span></Link>
            </nav>
          </div>
        </header>
        <div className="page-content">{children}</div>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <span>Addis Eats</span>
            <span>Made with care in every plate.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}