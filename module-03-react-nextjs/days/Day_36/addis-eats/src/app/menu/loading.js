export default function Loading() {
  return (
    <main className="min-h-screen bg-amber-50 px-6 py-16 text-stone-900">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-12 h-5 w-32 rounded bg-stone-200" />
        <div className="mb-5 h-14 w-64 rounded bg-stone-200" />
        <div className="mb-10 h-5 w-80 rounded bg-stone-200" />
        <div className="grid gap-5 sm:grid-cols-2">
          {[1, 2, 3, 4].map((item) => <div key={item} className="h-56 rounded-2xl bg-white shadow-sm" />)}
        </div>
      </div>
    </main>
  );
}