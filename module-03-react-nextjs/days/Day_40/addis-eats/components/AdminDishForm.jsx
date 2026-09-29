"use client";

import { useActionState } from "react";

import { addDish, updateDish } from "@/app/actions";

const makeInitialState = () => ({
  success: false,
  message: "",
  fieldErrors: {},
  values: {},
});

export function AdminDishForm({ mode = "add", dish = null }) {
  const action = mode === "edit" ? updateDish : addDish;
  const [state, formAction, isPending] = useActionState(action, makeInitialState());

  const defaultValues = dish ?? {
    name: "",
    category: "",
    description: "",
    price: "",
    image: "/images/",
    available: true,
  };

  return (
    <form action={formAction} noValidate className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {mode === "edit" && (
        <input type="hidden" name="dishId" value={dish?.id ?? ""} />
      )}

      <div>
        <label htmlFor={`${mode}-name`} className="mb-1 block text-sm font-semibold text-slate-700">Dish name</label>
        <input
          id={`${mode}-name`}
          name="name"
          defaultValue={state.values?.name ?? defaultValues.name}
          aria-invalid={Boolean(state.fieldErrors?.name)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500"
        />
        {state.fieldErrors?.name && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor={`${mode}-category`} className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
        <input
          id={`${mode}-category`}
          name="category"
          defaultValue={state.values?.category ?? defaultValues.category}
          aria-invalid={Boolean(state.fieldErrors?.category)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500"
        />
        {state.fieldErrors?.category && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.category[0]}</p>}
      </div>

      <div>
        <label htmlFor={`${mode}-description`} className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
        <textarea
          id={`${mode}-description`}
          name="description"
          rows={3}
          defaultValue={state.values?.description ?? defaultValues.description}
          aria-invalid={Boolean(state.fieldErrors?.description)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500"
        />
        {state.fieldErrors?.description && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.description[0]}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${mode}-price`} className="mb-1 block text-sm font-semibold text-slate-700">Price</label>
          <input
            id={`${mode}-price`}
            name="price"
            type="number"
            min="1"
            step="1"
            defaultValue={state.values?.price ?? defaultValues.price}
            aria-invalid={Boolean(state.fieldErrors?.price)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500"
          />
          {state.fieldErrors?.price && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.price[0]}</p>}
        </div>

        <div>
          <label htmlFor={`${mode}-image`} className="mb-1 block text-sm font-semibold text-slate-700">Image path</label>
          <input
            id={`${mode}-image`}
            name="image"
            defaultValue={state.values?.image ?? defaultValues.image}
            aria-invalid={Boolean(state.fieldErrors?.image)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500"
          />
          {state.fieldErrors?.image && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.image[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={`${mode}-available`} className="mb-1 block text-sm font-semibold text-slate-700">Availability</label>
        <select
          id={`${mode}-available`}
          name="available"
          defaultValue={String(state.values?.available ?? defaultValues.available ?? true)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500"
        >
          <option value="true">Available</option>
          <option value="false">Sold out</option>
        </select>
      </div>

      {state.message && (
        <p role="status" className={`rounded-xl border px-3 py-2 text-sm ${state.success ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isPending ? (mode === "edit" ? "Saving..." : "Adding...") : mode === "edit" ? "Save changes" : "Add dish"}
      </button>
    </form>
  );
}
