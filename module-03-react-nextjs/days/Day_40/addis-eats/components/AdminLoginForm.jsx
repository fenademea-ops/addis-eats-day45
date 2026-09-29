"use client";

import { useActionState, useState } from "react";

import { loginAdmin } from "@/app/actions";

const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
  values: {},
};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div>
        <label htmlFor="admin-email" className="mb-1.5 block text-sm font-semibold text-slate-800">
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue={state.values?.email ?? ""}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? "admin-email-error" : undefined}
          className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 aria-invalid:border-red-500"
          placeholder="admin@addiseats.com"
        />
        {state.fieldErrors?.email && (
          <p id="admin-email-error" className="mt-1.5 text-sm font-medium text-red-700">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold text-slate-800">
          Password
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            aria-invalid={Boolean(state.fieldErrors?.password)}
            aria-describedby={state.fieldErrors?.password ? "admin-password-error" : undefined}
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 aria-invalid:border-red-500"
            placeholder="Enter admin password"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-600 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {state.fieldErrors?.password && (
          <p id="admin-password-error" className="mt-1.5 text-sm font-medium text-red-700">
            {state.fieldErrors.password[0]}
          </p>
        )}
      </div>

      <label className="flex items-center gap-2.5 text-sm text-slate-700">
        <input
          type="checkbox"
          name="rememberMe"
          className="h-4 w-4 rounded border-slate-300 accent-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500"
        />
        Remember me for 30 days
      </label>

      {state.message && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="flex h-12 w-full items-center justify-center rounded-lg bg-orange-600 px-4 text-sm font-bold text-white transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}