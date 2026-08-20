# 🍲 Addis Eats - Restaurant Management & Online Food Delivery

Addis Eats is a modern, full-stack food delivery and restaurant management system tailored for Ethiopian cuisine and local payment workflows.

---

## 🌟 Key Features

### 🛒 Customer Storefront (`index.html`)
- **15 Food Categories**: Shiro, Fasting/Vegan, Meat Wats, Tibs, Kitfo, Juices, Pizza, Burgers, and more.
- **Bilingual Interface**: Seamless switching between English and Amharic (የአማርኛ ቋንቋ 지원).
- **Search & Filter**: Real-time search across dish names, Amharic translations, and ingredients.
- **Cart & Checkout**: Interactive shopping cart, promo codes (`HABESHA10`, `FREEDEL`, `ADDIS2026`), and auto delivery fee calculations by Addis Ababa sub-city.
- **Local Payments**: Support for Telebirr, CBE Birr, Chapa, and Cash on Delivery.
- **Receipt & Invoice Generator**: In-browser tax invoice generator with print/PDF support.

### ⚡ Admin Operations Dashboard (`admin-dashboard.html`)
- **Executive Analytics**: Real-time tracking of revenue (ETB), lifetime order counts, active kitchen metrics, and top-selling dishes.
- **Live Kitchen Order Pipeline**: Track and update status (`Pending` ➔ `Preparing` ➔ `Delivering` ➔ `Delivered` ➔ `Cancelled`).
- **Menu Management (CRUD)**: Add, edit, or delete dishes with stock count controls and real-time "In Stock / Sold Out" toggles.
- **Category Controller**: Instantly enable or disable entire food categories across the storefront.

---

## 📁 Project Structure

```text
├── index.html            # Customer Storefront Portal
├── admin-login.html      # Administrator Authentication Page
├── admin-dashboard.html  # Live Kitchen & Restaurant Management Dashboard
├── styles.css            # Main Storefront & Global Stylesheet
├── admin.css             # Admin Dashboard Stylesheet (Fixed layout & dark mode)
├── app.js                # Customer App Logic (State, Cart, Checkout, i18n)
├── admin.js              # Admin Dashboard Logic (CRUD, Orders, Analytics)
├── admin-login.js        # Admin Authentication Logic
└── data/
    └── menu.json         # Seed Menu Data & Category Configurations