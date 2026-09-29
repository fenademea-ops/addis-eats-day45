import Link from "next/link";

export function AdminLoginPrompt() {
  return (
    <Link href="/admin/login" className="mt-6 inline-flex rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">
      Admin Login
    </Link>
  );
}