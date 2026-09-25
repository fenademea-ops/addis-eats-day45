import Link from "next/link";
import Image from "next/image";

export default function DishList({ dishes }) {
  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <Link className="dish-card" href={`/menu/${dish.id}`} key={dish.id}>
          <div className="dish-top">
            <Image className="dish-image" src={dish.image} alt={dish.name} width={160} height={110} />
            <strong>ETB {dish.price}</strong>
          </div>
          <p className="dish-category">{dish.category}</p>
          <h3>{dish.name}</h3>
          <p>{dish.description}</p>
          <span className="view-dish">View dish &rarr;</span>
        </Link>
      ))}
    </div>
  );
}
