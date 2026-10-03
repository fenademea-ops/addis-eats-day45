import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "@/app/actions";
import { getSafeNext } from "@/lib/redirects";
import { getSession } from "@/lib/session";

type Props = {
  searchParams: Promise<{
    next?: string | string[];
    error?: string;
    signedOut?: string;
  }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const session = await getSession();
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = getSafeNext(rawNext);

  if (session) {
    redirect(next);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center p-6">
      <Link className="text-sm font-semibold text-orange-700" href="/">
        Addis Eats
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Sign in</h1>
      <p className="mt-2 text-gray-600">
        Sign in to see your orders and continue to checkout.
      </p>

      {params.error === "invalid" && (
        <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          Email or password is incorrect.
        </p>
      )}
      {params.signedOut === "1" && (
        <p className="mt-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800" role="status">
          You have signed out.
        </p>
      )}

      <form action={signIn} className="mt-6 space-y-4">
        <input type="hidden" name="next" value={next} />
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="username"
            className="w-full rounded-lg border px-3 py-2.5"
            id="email"
            maxLength={320}
            name="email"
            required
            type="email"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="current-password"
            className="w-full rounded-lg border px-3 py-2.5"
            id="password"
            maxLength={1024}
            name="password"
            required
            type="password"
          />
        </div>
        <button
          className="w-full rounded-lg bg-orange-700 px-4 py-2.5 font-semibold text-white hover:bg-orange-800"
          type="submit"
        >
          Sign in
        </button>
      </form>

      {process.env.NODE_ENV !== "production" && (
        <aside className="mt-6 rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
          <p className="font-semibold">Local demo accounts</p>
          <p className="mt-2">Customer A: a@addiseats.local / AddisA!2026</p>
          <p>Customer B: b@addiseats.local / AddisB!2026</p>
          <p>Kitchen staff: staff@addiseats.local / Kitchen!2026</p>
        </aside>
      )}
    </main>
  );
}
