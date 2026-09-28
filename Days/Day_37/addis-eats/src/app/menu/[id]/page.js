import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes, findDish } from "../../data/dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = findDish(id);
  if (!dish) notFound();

  return <article className="dish-detail"><Link className="back-link" href="/menu">&larr; Back to menu</Link><div className="detail-emoji" aria-hidden="true">{dish.emoji}</div><p className="eyebrow">{dish.category}</p><h1>{dish.name}</h1><p className="detail-copy">{dish.description}</p><div className="detail-footer"><strong>ETB {dish.price}</strong><Link className="button" href="/cart">Add to cart <span aria-hidden="true">&rarr;</span></Link></div></article>;
}