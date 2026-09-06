export default function Field({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  inputRef,
  type = "text",
  as = "input",
  children,
  placeholder,
  autoComplete,
}) {
  const inputId = `checkout-${name}`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? errorId : undefined;
  const props = {
    id: inputId,
    name,
    value,
    onChange,
    onBlur,
    ref: inputRef,
    placeholder,
    autoComplete,
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": describedBy,
    className: `checkout-field${error ? " checkout-field-error" : ""}`,
  };

  return (
    <div className="checkout-form-group">
      <label htmlFor={inputId}>{label}</label>
      {as === "textarea" ? (
        <textarea {...props} rows="4" />
      ) : as === "select" ? (
        <select {...props}>{children}</select>
      ) : (
        <input {...props} type={type} />
      )}
      {error && (
        <p id={errorId} className="checkout-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
