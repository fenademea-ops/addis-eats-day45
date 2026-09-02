import { useState } from "react";

export function OrderForm({ totalAmount, onOrderComplete }) {
  const [formData, setFormData] = useState({ name: "", phone: "", area: "Bole" });

  const teleBirrRegex = /^(\+251[97]\d{8}|0[97]\d{8})$/;
  const isPhoneValid = teleBirrRegex.test(formData.phone.trim());
  const isFormValid = isPhoneValid && formData.name.trim() !== "" && totalAmount > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    alert(`Order placed successfully!\nTotal: ${totalAmount} ETB`);
    onOrderComplete();
    setFormData({ name: "", phone: "", area: "Bole" });
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h3 className="form-title">Delivery Details</h3>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>TeleBirr Phone Number</label>
        <input
          type="text"
          name="phone"
          placeholder="0911223344 or +251911223344"
          className={`form-control ${formData.phone && !isPhoneValid ? "error" : ""}`}
          value={formData.phone}
          onChange={handleChange}
        />
        {formData.phone && !isPhoneValid && (
          <span className="error-text">Invalid Ethiopian TeleBirr format</span>
        )}
      </div>

      <div className="form-group">
        <label>Delivery Area</label>
        <select
          name="area"
          className="form-control"
          value={formData.area}
          onChange={handleChange}
        >
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Piassa">Piassa</option>
          <option value="CMC">CMC</option>
        </select>
      </div>

      <button type="submit" disabled={!isFormValid} className="submit-btn">
        Place TeleBirr Order ({totalAmount} ETB)
      </button>
    </form>
  );
}