"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AUTH_KEY = "addis-eats-auth";

export function AuthGate({ children, redirectTo = "/menu" }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(AUTH_KEY);
      const auth = raw ? JSON.parse(raw) : null;

      if (!auth || auth.isLoggedIn !== true) {
        router.replace(`/login?redirect=${encodeURIComponent(redirectTo)}`);
        return;
      }

      setIsReady(true);
    } catch {
      router.replace(`/login?redirect=${encodeURIComponent(redirectTo)}`);
    }
  }, [redirectTo, router]);

  if (!isReady) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
        Checking your session...
      </div>
    );
  }

  return children;
}
