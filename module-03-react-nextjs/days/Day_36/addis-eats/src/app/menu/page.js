import { CategoryBar, DishList } from "./components";
import Header from "../components/Header";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-amber-50 px-6 py-10 text-stone-900">
      <Header />
      <div className="mx-auto max-w-5xl pt-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-700">From our kitchen</p>
          <h1 className="text-5xl font-black tracking-tight text-emerald-950">The menu</h1>
          <p className="mt-4 max-w-xl text-stone-600">A few beloved plates from Addis, made for sharing.</p>
        </div>
        <CategoryBar />
        <DishList />
      </div>
    </main>
  );
}