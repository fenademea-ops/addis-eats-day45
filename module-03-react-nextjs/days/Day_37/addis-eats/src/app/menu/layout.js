import Link from "next/link";

const categories = ["All dishes", "Classics", "Vegetarian", "Breakfast"];

export default function MenuLayout({ children }) {
  return (
    <div className="shell menu-layout">
      <div className="menu-sidebar">
        <p className="eyebrow">From our kitchen</p>
        <h1>Our menu</h1>
        <p className="sidebar-copy">Beloved Ethiopian plates, prepared for sharing.</p>
        <nav aria-label="Menu categories">
          {categories.map((category, index) => (
            <Link className={index === 0 ? "category active" : "category"} href="/menu" key={category}>{category}<span aria-hidden="true">&rarr;</span></Link>
          ))}
        </nav>
      </div>
      <section className="menu-content">{children}</section>
    </div>
  );
}