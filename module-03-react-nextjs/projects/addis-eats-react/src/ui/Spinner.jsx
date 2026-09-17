function Spinner({ label = "Loading" }) {
  return <span className="app-spinner" role="status" aria-label={label} />;
}

export default Spinner;