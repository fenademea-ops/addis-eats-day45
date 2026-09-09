function DishCard({ dish }) {
  return (
    <article className="food-card">
      <img
        className="food-image"
        src={dish.image}
        alt={dish.name}
      />

      <div className="food-content">
        <span className="food-category">
          {dish.category}
        </span>

        <h2 className="food-name">{dish.name}</h2>

        <p className="food-description">
          {dish.description}
        </p>

        <div className="food-bottom">
          <span className="food-price">
            {dish.price} ETB
          </span>

          <button className="add-button">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;