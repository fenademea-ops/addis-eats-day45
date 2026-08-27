import PropTypes from "prop-types";
import Card from "./Card.jsx";
import Dish from "./Dish.jsx";
import { initialDishes } from "./data.js";

function Menu({ category, dishes = initialDishes, currency = "ETB" }) {
  const filtered = dishes.filter((dish) => dish.category === category);

  return (
    <Card title={category}>
      {filtered.length === 0 ? (
        <p className="empty">
          Nothing on the menu for {category} today — check back soon.
        </p>
      ) : (
        <ul className="dish-list">
          {filtered.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
              currency={currency}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}

Menu.propTypes = {
  category: PropTypes.string.isRequired,
  currency: PropTypes.string,
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    })
  ),
};

export default Menu;
