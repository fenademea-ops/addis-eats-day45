import { Providers } from "../components/Providers";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "A food-ordering app for Ethiopian favorites and modern meals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-stone-50 text-slate-800 antialiased">
        <Providers>
          <div className="min-h-screen">
            <SiteHeader />

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>

            <footer className="border-t border-slate-200 bg-slate-900 px-4 py-8 text-center text-sm text-slate-300">
              © 2026 Addis Eats. Fresh meals, made for everyday cravings.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
