import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/AdminLoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.isAdmin) redirect("/admin");

  return (
    <section className="grid min-h-[calc(100vh-76px)] place-items-center px-4 py-8 sm:px-6">
      <section className="grid w-full max-w-4xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between bg-[#173b32] p-7 text-white sm:p-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Addis Eats home">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-orange-500 text-sm font-black">AE</span>
              <span className="text-xl font-bold">Addis Eats</span>
            </Link>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-orange-200">Restaurant operations</p>
            <h2 className="mt-3 text-3xl font-bold">Admin Login</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
              Sign in to manage your Addis Eats restaurant.
            </p>
          </div>
          <p className="mt-10 border-t border-white/15 pt-4 text-xs text-white/60">Addis Eats · Administration</p>
        </div>

        <div className="p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700">Administrator access</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Welcome back</h2>
          <p className="mb-7 mt-1 text-sm text-slate-600">Enter your credentials to continue.</p>

          <AdminLoginForm />

          <p className="mt-6 border-t border-slate-200 pt-5 text-sm text-slate-600">
            Demo authentication for this educational project. Not for production use.
          </p>
          <Link href="/" className="mt-5 inline-flex text-sm font-semibold text-orange-700 hover:text-orange-800">
            <span aria-hidden="true" className="mr-2">←</span> Back to Store
          </Link>
        </div>
      </section>
    </section>
  );
}