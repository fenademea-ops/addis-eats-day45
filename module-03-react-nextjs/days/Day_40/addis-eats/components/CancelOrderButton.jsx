"use client";

import { useActionState } from "react";

import { cancelOrder } from "@/app/actions";

const initialState = { success: false, message: "" };

export function CancelOrderButton({ orderId }) {
  const [state, formAction, isPending] = useActionState(cancelOrder, initialState);

  return (
    <form action={formAction} className="mt-3">
      <input type="hidden" name="orderId" value={orderId} />
      <button type="submit" disabled={isPending || state.success} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60">
        {isPending ? "Cancelling..." : state.success ? "Cancelled" : "Cancel this order"}
      </button>
      {state.message && <p role="status" className="mt-2 text-sm text-slate-600">{state.message}</p>}
    </form>
  );
}