export function DishList({ dishes, onAddToCart }) {
  if (dishes.length === 0) {
    return <p style={{ color: "#666" }}>No dishes in this category yet.</p>;
  }

  return (
    <div style={{ display: "grid", gap: "12px", margin: "16px 0" }}>
      {dishes.map((dish) => (
        <div
          key={dish.id}
          style={{
            border: "1px solid #e5e7eb",
            padding: "12px 16px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h4 style={{ margin: 0 }}>{dish.name}</h4>
            <span style={{ fontSize: "14px", color: "#666" }}>
              {dish.price} ETB
            </span>
          </div>
          <button
            onClick={() => onAddToCart(dish.price)}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            + Add to Order
          </button>
        </div>
      ))}
    </div>
  );
}