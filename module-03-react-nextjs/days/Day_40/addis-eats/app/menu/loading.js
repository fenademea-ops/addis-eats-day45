export default function MenuLoading() {
  return (
    <div className="space-y-5">
      <div className="h-8 w-40 animate-pulse rounded-full bg-slate-200" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-48 animate-pulse bg-slate-200" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-24 animate-pulse rounded-full bg-slate-200" />
              <div className="h-6 w-2/3 animate-pulse rounded-full bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
              <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
