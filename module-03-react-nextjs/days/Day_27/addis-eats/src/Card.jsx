import PropTypes from "prop-types";

// Reusable wrapper: renders whatever children it is given.
function Card({ children, title }) {
  return (
    <section className="card">
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </section>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Card;
