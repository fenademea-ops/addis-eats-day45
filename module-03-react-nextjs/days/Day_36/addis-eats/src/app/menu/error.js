"use client";

export default function MenuError({ reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 px-6 text-center text-stone-900">
      <div>
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-700">Kitchen trouble</p>
        <h1 className="text-4xl font-black text-emerald-950">The menu could not load.</h1>
        <button onClick={() => reset()} className="mt-8 rounded-full bg-emerald-900 px-6 py-3 font-bold text-white hover:bg-emerald-800">Try again</button>
      </div>
    </main>
  );
}