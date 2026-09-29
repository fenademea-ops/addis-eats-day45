import { Providers } from "../components/Providers";
import { SiteFrame } from "@/components/SiteFrame";
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
          <SiteFrame>{children}</SiteFrame>
        </Providers>
      </body>
    </html>
  );
}
