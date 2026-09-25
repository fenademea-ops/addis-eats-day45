import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findDish } from "../../../lib/dishes";
import AddToCartButton from "../AddToCartButton";

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = findDish(id);
  if (!dish) notFound();

  return (
    <main className="shell page-section detail-page">
      <Link href="/menu" className="back-link">&larr; Back to menu</Link>
      <p className="eyebrow">{dish.category}</p>
      <h1>{dish.name}</h1>
      <Image src={dish.image} alt={dish.name} width={680} height={360} />
      <p className="hero-copy">{dish.description}</p>
      <strong>ETB {dish.price}</strong>
      <div className="detail-action"><AddToCartButton dish={dish} /></div>
    </main>
  );
}
