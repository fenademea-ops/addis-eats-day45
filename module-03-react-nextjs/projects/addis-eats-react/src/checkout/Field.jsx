function Field({ label, id, error, children }) {
  return <div className="checkout-field"><label htmlFor={id}>{label}</label>{children}{error && <span className="form-error">{error}</span>}</div>;
}

export default Field;