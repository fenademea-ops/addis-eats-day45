export function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
      {categories.map((cat) => {
        const isActive = cat === selected;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #10b981",
              backgroundColor: isActive ? "#10b981" : "transparent",
              color: isActive ? "#fff" : "#10b981",
              fontWeight: isActive ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}