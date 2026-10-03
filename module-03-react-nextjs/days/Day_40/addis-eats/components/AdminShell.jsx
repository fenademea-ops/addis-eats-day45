"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { logoutAdmin } from "@/app/actions";
import { AdminSidebar } from "@/components/AdminSidebar";

function getPageTitle(pathname) {
  if (pathname.startsWith("/admin/login")) return "Admin Login";
  if (pathname.startsWith("/admin/dishes")) return "Menu management";
  if (pathname.startsWith("/admin/orders")) return "Order management";
  return "Dashboard";
}

export function AdminShell({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const isLoginPage = pathname.startsWith("/admin/login");

  const closeSidebar = useCallback(() => {
    menuButtonRef.current?.focus();
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    function closeOnEscape(event) {
      if (event.key === "Escape") closeSidebar();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [sidebarOpen, closeSidebar]);

  return (
    <div className="min-h-screen bg-[#f3f5f2] text-[#172822]">
      <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          {!isLoginPage && <button
            type="button"
            ref={menuButtonRef}
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            aria-controls="admin-sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => (sidebarOpen ? closeSidebar() : setSidebarOpen(true))}
            className="flex h-10 shrink-0 items-center gap-3 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <span aria-hidden="true" className="grid w-4 gap-[3px]">
              <span className="h-0.5 w-4 rounded bg-current" />
              <span className="h-0.5 w-4 rounded bg-current" />
              <span className="h-0.5 w-4 rounded bg-current" />
            </span>
            <span>Menu</span>
          </button>}
          <div className="min-w-0">
            <p className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:block">Addis Eats / Administration</p>
            <h1 className="truncate text-lg font-bold text-slate-900 sm:mt-0.5 sm:text-xl">{getPageTitle(pathname)}</h1>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!isLoginPage && (
            <form action={logoutAdmin}>
              <button type="submit" className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:px-4 sm:text-sm">
                Logout
              </button>
            </form>
          )}
          <Link href="/" className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-800 sm:px-4 sm:text-sm">
            View store
          </Link>
        </div>
      </header>

      {!isLoginPage && sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 cursor-default bg-slate-950/45"
        />
      )}

      {!isLoginPage && <AdminSidebar open={sidebarOpen} onClose={closeSidebar} />}

      <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}