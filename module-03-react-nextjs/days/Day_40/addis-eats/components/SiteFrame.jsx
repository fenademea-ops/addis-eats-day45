"use client";

import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/SiteHeader";

export function SiteFrame({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <div className="page-wrapper">{children}</div>;
  }

  return (
    <div className="page-wrapper">
      <SiteHeader />
      <main className="main-content mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-slate-900 px-4 py-8 text-center text-sm text-slate-300">
        © 2026 Addis Eats. Fresh meals, made for everyday cravings.
      </footer>
    </div>
  );
}