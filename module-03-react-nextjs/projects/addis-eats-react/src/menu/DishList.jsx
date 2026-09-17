import DishCard from "./DishCard.jsx";

function DishList({ dishes }) {
  return <div className="food-grid">{dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}</div>;
}

export default DishList;