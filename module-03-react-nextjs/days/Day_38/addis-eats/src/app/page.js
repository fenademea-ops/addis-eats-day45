import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="shell home-page">
      <section className="hero">
        <div>
          <p className="eyebrow">Taste the highlands</p>
          <h1>Comfort food, served Addis-style.</h1>
          <p className="hero-copy">
            Fragrant spices, generous plates, and the warm hospitality of Ethiopia
            delivered to your table.
          </p>
          <Link href="/menu" className="button">
            Explore the menu <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="feature-card">
          <span className="pill">Today&apos;s favorite</span>
          <Image
            className="feature-image"
            src="/images/doro_wat.jpg"
            alt="Doro Wot Ethiopian chicken stew"
            width={520}
            height={280}
            priority
          />
          <p className="eyebrow light">Classic plate</p>
          <div className="feature-title">
            <h2>Doro Wot</h2>
            <strong>ETB 180</strong>
          </div>
          <p>Tender chicken, berbere, and a boiled egg over warm injera.</p>
        </div>
      </section>
      <section className="highlights">
        <div>
          <strong>Made to order</strong>
          <span>Fresh spices in every plate</span>
        </div>
        <div>
          <strong>Shared with love</strong>
          <span>Generous portions for the table</span>
        </div>
        <div>
          <strong>Delivered warm</strong>
          <span>From our kitchen to your door</span>
        </div>
      </section>
    </main>
  );
}
