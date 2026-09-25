import Link from "next/link";

export default function NotFound() {
  return <main className="shell page-section"><h1>Dish not found</h1><Link className="button" href="/menu">Back to menu</Link></main>;
}
