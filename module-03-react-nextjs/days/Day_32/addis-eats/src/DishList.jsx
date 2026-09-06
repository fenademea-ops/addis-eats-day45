export default function DishList({ dishes, search }) {
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredDishes.length === 0) {
    return (
      <div className="empty-state">
        <p>No dishes found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="dish-grid">
      {filteredDishes.map((dish) => (
        <article key={dish.id} className="dish-card">
          <h3>{dish.name}</h3>
          <p className="price">${dish.price.toFixed(2)}</p>
          <p className="description">{dish.description}</p>
        </article>
      ))}
    </div>
  );
}