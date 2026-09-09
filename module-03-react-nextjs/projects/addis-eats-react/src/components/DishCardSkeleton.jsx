function DishCardSkeleton() {
  return (
    <article className="food-card skeleton-card">
      <div className="skeleton skeleton-image"></div>

      <div className="food-content">
        <div className="skeleton skeleton-category"></div>

        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text skeleton-text-short"></div>

        <div className="food-bottom">
          <div className="skeleton skeleton-price"></div>

          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </article>
  );
}

export default DishCardSkeleton;