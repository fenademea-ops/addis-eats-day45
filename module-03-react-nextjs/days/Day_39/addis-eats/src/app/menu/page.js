import Image from "next/image";
import Link from "next/link";
import { dishes } from "../../lib/dishes";
import AddToCartButton from "./AddToCartButton";

export default function MenuPage() {
  return (
    <main className="shell page-section">
      <p className="eyebrow">From our kitchen</p>
      <h1>Choose your plate</h1>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <article className="dish-card" key={dish.id}>
            <Image src={dish.image} alt={dish.name} width={240} height={150} />
            <p className="dish-category">{dish.category}</p>
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <strong>ETB {dish.price}</strong>
            <div className="card-actions">
              <Link href={`/menu/${dish.id}`}>Details</Link>
              <AddToCartButton dish={dish} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
