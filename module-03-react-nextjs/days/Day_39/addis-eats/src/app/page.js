import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell home-page">
      <p className="eyebrow">Taste the highlands</p>
      <h1>Comfort food, served Addis-style.</h1>
      <p className="hero-copy">Fragrant spices, generous plates, and warm Ethiopian hospitality delivered to your table.</p>
      <Link href="/menu" className="button">Explore the menu &rarr;</Link>
    </main>
  );
}
