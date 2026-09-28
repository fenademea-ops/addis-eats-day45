"use client";

export default function MenuError({ reset }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="text-2xl font-bold text-red-700">Something went wrong.</h2>
      <p className="mt-3 text-red-600">Try again.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-5 rounded-full bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
