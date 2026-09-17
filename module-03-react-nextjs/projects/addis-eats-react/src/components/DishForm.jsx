import { useState } from "react";

function normalizeIngredients(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function DishForm({ dish, onSubmit, onCancel }) {
  const startingDish = dish
    ? {
        ...dish,
        ingredients: Array.isArray(dish.ingredients)
          ? dish.ingredients.join(", ")
          : dish.ingredients || "",
      }
    : {
      id: null,
        name: "",
        category: "",
        description: "",
        ingredients: "",
        price: "",
        image: "/images/",
        available: true,
        featured: false,
      };

  const [form, setForm] = useState(startingDish);
  const [errors, setErrors] = useState({});

  function validate(nextForm) {
    const nextErrors = {};

    if (!nextForm.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!nextForm.category.trim()) {
      nextErrors.category = "Category is required.";
    }

    if (!nextForm.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    const price = Number(nextForm.price);
    if (!nextForm.price || Number.isNaN(price) || price <= 0) {
      nextErrors.price = "Enter a valid price.";
    }

    if (!nextForm.image.trim()) {
      nextErrors.image = "Image path is required.";
    } else if (!nextForm.image.startsWith("/images/")) {
      nextErrors.image = "Use a local image path under /images/.";
    } else if (nextForm.image.startsWith("http://") || nextForm.image.startsWith("https://")) {
      nextErrors.image = "Use a local image path under /images/.";
    }

    return nextErrors;
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const normalizedDish = {
      ...form,
      id: dish?.id || Date.now(),
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      ingredients: normalizeIngredients(form.ingredients),
      price: Number(form.price),
      image: form.image.trim(),
      available: Boolean(form.available),
      featured: Boolean(form.featured),
    };

    onSubmit(normalizedDish);
  }

  return (
    <form className="dish-form" onSubmit={handleSubmit} noValidate>
      <div className="dish-form-grid">
        <div className="dish-form-field">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            className="checkout-input"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="dish-form-field">
          <label htmlFor="category">Category *</label>
          <input
            id="category"
            name="category"
            className="checkout-input"
            value={form.category}
            onChange={handleChange}
          />
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>

        <div className="dish-form-field dish-form-full">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            className="checkout-input"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <span className="form-error">{errors.description}</span>}
        </div>

        <div className="dish-form-field dish-form-full">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            className="checkout-input"
            value={form.ingredients}
            onChange={handleChange}
          />
        </div>

        <div className="dish-form-field">
          <label htmlFor="price">Price *</label>
          <input
            id="price"
            name="price"
            className="checkout-input"
            type="number"
            min="1"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>

        <div className="dish-form-field">
          <label htmlFor="image">Image *</label>
          <input
            id="image"
            name="image"
            className="checkout-input"
            value={form.image}
            onChange={handleChange}
          />
          {errors.image && <span className="form-error">{errors.image}</span>}
        </div>

        <div className="dish-form-field checkbox-field">
          <label>
            <input
              type="checkbox"
              name="available"
              checked={Boolean(form.available)}
              onChange={handleChange}
            />
            Available
          </label>
        </div>

        <div className="dish-form-field checkbox-field">
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={Boolean(form.featured)}
              onChange={handleChange}
            />
            Featured
          </label>
        </div>
      </div>

      <div className="dish-form-actions">
        <button className="admin-small-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="checkout-button dish-form-submit" type="submit">
          Save Dish
        </button>
      </div>
    </form>
  );
}

export default DishForm;
