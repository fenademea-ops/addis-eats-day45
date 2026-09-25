import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findDish } from "../../data/dishes";
import AddToCartButton from "./AddToCartButton";

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = findDish(id);

  if (!dish) {
    notFound();
  }

  return (
    <main className="shell">
      <article className="dish-detail">
        <Link href="/menu" className="back-link">
          &larr; Back to menu
        </Link>
        <p className="eyebrow">{dish.category}</p>
        <h1>{dish.name}</h1>
        <Image className="detail-image" src={dish.image} alt={dish.name} width={680} height={360} />
        <p className="detail-copy">{dish.description}</p>
        <div className="detail-footer">
          <strong>ETB {dish.price}</strong>
          <AddToCartButton dish={dish} />
        </div>
      </article>
    </main>
  );
}
