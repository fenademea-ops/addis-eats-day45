import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-emerald-950/10 bg-amber-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="group flex items-center gap-3" aria-label="Addis Eats home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-lg text-amber-50 shadow-sm transition group-hover:bg-orange-600" aria-hidden="true">
            AE
          </span>
          <span>
            <span className="block text-lg font-black leading-none tracking-tight text-emerald-950">Addis Eats</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-orange-700">Taste the highlands</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2 text-sm font-bold" aria-label="Main navigation">
          <Link href="/menu" className="rounded-full px-4 py-2 text-emerald-950 transition hover:bg-emerald-900/10">Menu</Link>
          <Link href="/cart" className="rounded-full bg-orange-600 px-4 py-2 text-white shadow-sm transition hover:bg-orange-700">
            Cart <span className="ml-1" aria-hidden="true">&#8594;</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}