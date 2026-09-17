export default function validateCheckout(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = "Full name is required.";
  if (!values.location?.trim()) errors.location = "Delivery location is required.";
  if (!values.phone?.trim()) errors.phone = "Phone number is required.";
  return errors;
}