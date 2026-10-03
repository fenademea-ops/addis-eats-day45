import Link from "next/link";
import { redirect } from "next/navigation";
import { placeOrder, signOut } from "@/app/actions";
import { getSession } from "@/lib/session";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=/checkout");
  }

  const params = await searchParams;

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link className="text-sm font-semibold text-orange-700" href="/">
            Addis Eats
          </Link>
          <h1 className="mt-2 text-3xl font-bold">Checkout</h1>
        </div>
        <form action={signOut}>
          <button className="rounded-lg border px-4 py-2 font-semibold" type="submit">
            Sign out
          </button>
        </form>
      </div>
      <p className="mt-3 text-gray-600">
        Placing an order as {session.name}. Your account ID is taken from your
        verified session, not from the form.
      </p>

      {params.error === "meal" && (
        <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800" role="alert">
          Select a meal from the menu.
        </p>
      )}

      <form action={placeOrder} className="mt-6 space-y-4 rounded-xl border p-5">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Meal</span>
          <select className="w-full rounded-lg border px-3 py-2.5" name="meal" required>
            <option value="">Choose a meal</option>
            <option value="Doro wat">Doro wat — ETB 420</option>
            <option value="Shiro">Shiro — ETB 280</option>
            <option value="Tibs">Tibs — ETB 500</option>
          </select>
        </label>
        <button className="rounded-lg bg-orange-700 px-4 py-2.5 font-semibold text-white" type="submit">
          Place order
        </button>
      </form>
    </main>
  );
}
