import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false }) {
  return (
    <li className="dish">
      <h3 className="dish-name">
        {name}
        {/* boolean guard: nothing renders (no stray 0) when spicy is false */}
        {Boolean(spicy) && <span className="badge">Spicy</span>}
      </h3>
      <p className="dish-price">
        {price} {currency}
      </p>
    </li>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
};

export default Dish;
