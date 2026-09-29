"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { logoutAdmin } from "@/app/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/dishes", label: "Dishes" },
  { href: "/admin/orders", label: "Orders" },
];

export function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <aside
      id="admin-sidebar"
      aria-label="Admin navigation"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-y-0 left-0 z-50 flex w-[min(21rem,88vw)] flex-col bg-[#173b32] p-5 text-white shadow-2xl transition-transform duration-200 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="mb-8 flex items-start justify-between gap-4 border-b border-white/15 pb-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-orange-500 text-sm font-black text-white">AE</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200">Restaurant operations</p>
            <h2 className="mt-1 text-xl font-bold">Addis Eats</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-2xl leading-none text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <nav aria-label="Admin sections" className="space-y-1">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);

          return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            onClick={onClose}
            className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${active ? "bg-orange-500 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
          >
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-white/35"}`} />
            {link.label}
          </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-white/15 pt-4">
        <form action={logoutAdmin}>
          <button type="submit" className="flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">
            Logout
          </button>
        </form>
        <Link
          href="/"
          onClick={onClose}
          className="flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          View storefront
        </Link>
      </div>
    </aside>
  );
}
