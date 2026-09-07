export function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const phone = form.phone.trim();
  const area = form.area.trim();

  if (!name) {
    errors.name = "Enter your full name.";
  }

  if (!phone) {
    errors.phone = "Enter your TeleBirr phone number.";
  } else if (!/^(?:\+251|0)9\d{8}$/.test(phone)) {
    errors.phone = "Use a valid Ethiopian TeleBirr number, such as 0911223344.";
  }

  if (!area) {
    errors.area = "Select a delivery area.";
  }

  return errors;
}
