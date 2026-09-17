function CategoryBar({ categories, selectedCategory, onChange }) {
  return (
    <div className="category-container">
      {categories.map((category) => (
        <button className={`category-button ${selectedCategory === category ? "active" : ""}`} key={category} type="button" onClick={() => onChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;