"use client";

const categories = ["All dishes", "Classics", "Vegetarian", "Breakfast"];

export default function CategoryBar({ active = "All dishes", onChange }) {

  return (
    <div className="menu-sidebar">
      <p className="eyebrow">From our kitchen</p>
      <h1>Our menu</h1>
      <p className="sidebar-copy">Beloved Ethiopian plates, prepared for sharing.</p>
      <nav aria-label="Menu categories">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={category === active ? "category active" : "category"}
            onClick={() => onChange?.(category)}
          >
            {category}
            <span aria-hidden="true">&rarr;</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
