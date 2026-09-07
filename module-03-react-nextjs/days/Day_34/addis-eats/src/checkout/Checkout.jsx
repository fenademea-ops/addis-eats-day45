import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/orders";
import Field from "./Field";
import { validate } from "./validate";

const initialForm = {
  name: "",
  phone: "",
  area: "",
  notes: "",
};

const initialTouched = {
  name: false,
  phone: false,
  area: false,
  notes: false,
};

export default function Checkout() {
  const { items, totalInETB, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(initialTouched);
  const [serverErrors, setServerErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fieldRefs = useRef({});
  const errors = { ...validate(form), ...serverErrors };
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([field]) => touched[field])
  );

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setServerErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setFeedback("");
  };

  const touchField = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const focusFirstError = (nextErrors) => {
    const firstField = Object.keys(nextErrors)[0];
    if (firstField) {
      fieldRefs.current[firstField]?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const validationErrors = validate(form);
    const allTouched = Object.keys(initialTouched).reduce(
      (current, field) => ({ ...current, [field]: true }),
      {}
    );
    setTouched(allTouched);
    setServerErrors({});

    if (Object.keys(validationErrors).length > 0) {
      focusFirstError(validationErrors);
      return;
    }

    setSubmitting(true);
    setFeedback("");

    try {
      await placeOrder({ ...form, items, total: totalInETB });
      clearCart();
      setForm(initialForm);
      setTouched(initialTouched);
      setFeedback("Your order was placed successfully.");
    } catch (error) {
      const nextErrors = error.fieldErrors || {};
      setServerErrors(nextErrors);
      setTouched((current) => ({ ...current, ...nextErrors }));
      setFeedback(error.message || "We could not place your order. Please try again.");
      focusFirstError(nextErrors);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="hero-card">
        <h2>Your Cart is Empty</h2>
        <p>Please select items from the menu to build your order.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <div className="checkout-heading">
          <p className="checkout-eyebrow">Addis Eats</p>
          <h2>Complete your checkout</h2>
          <p>Tell us where to deliver your Ethiopian favorites.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <Field
            name="name"
            label="Full name"
            value={form.name}
            onChange={updateField}
            onBlur={touchField}
            error={visibleErrors.name}
            inputRef={(element) => { fieldRefs.current.name = element; }}
            autoComplete="name"
          />
          <Field
            name="phone"
            label="TeleBirr phone"
            type="tel"
            placeholder="0911223344 or +251911223344"
            value={form.phone}
            onChange={updateField}
            onBlur={touchField}
            error={visibleErrors.phone}
            inputRef={(element) => { fieldRefs.current.phone = element; }}
            autoComplete="tel"
          />
          <Field
            name="area"
            label="Delivery area"
            as="select"
            value={form.area}
            onChange={updateField}
            onBlur={touchField}
            error={visibleErrors.area}
            inputRef={(element) => { fieldRefs.current.area = element; }}
          >
            <option value="">Choose an area</option>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Piassa">Piassa</option>
            <option value="CMC">CMC</option>
          </Field>
          <Field
            name="notes"
            label="Delivery notes (optional)"
            as="textarea"
            value={form.notes}
            onChange={updateField}
            onBlur={touchField}
            error={visibleErrors.notes}
            inputRef={(element) => { fieldRefs.current.notes = element; }}
            placeholder="Apartment, landmark, or other helpful details"
          />

          {feedback && (
            <p className={`checkout-feedback${feedback.includes("successfully") ? " success" : ""}`} role="alert">
              {feedback}
            </p>
          )}

          <button type="submit" className="checkout-submit" disabled={submitting}>
            {submitting ? "Sending order..." : `Place order - ${totalInETB.toFixed(2)} ETB`}
          </button>
        </form>
      </div>
    </div>
  );
}
