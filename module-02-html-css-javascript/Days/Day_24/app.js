/**
 * Addis Eats - Core Architecture
 * Polished, refactored with pure helpers and guard clauses.
 */

// --- Constants & Regex ---
const STORAGE_KEY = "addis_eats_cart";
// Matches standard Ethiopian formats: 09XXXXXXXX, 07XXXXXXXX, +2519XXXXXXXX, or +2517XXXXXXXX
const ETHIOPIAN_PHONE_REGEX = /^(?:\+251|0)[79]\d{8}$/;
const MIN_NAME_LENGTH = 2;
const MIN_ADDRESS_LENGTH = 3;

// --- Application State ---
const state = {
  items: [],
  filters: {
    searchQuery: "",
    category: "all"
  },
  cart: safelyLoadCart()
};

// --- DOM Element References ---
const elements = {
  menuContainer: document.getElementById("menuContainer"),
  categoryFilters: document.getElementById("categoryFilters"),
  searchInput: document.getElementById("searchInput"),
  cartCount: document.getElementById("cartCount"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartBackdrop: document.getElementById("cartBackdrop"),
  cartToggleBtn: document.getElementById("cartToggleBtn"),
  cartCloseBtn: document.getElementById("cartCloseBtn"),
  cartItemList: document.getElementById("cartItemList"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutForm: document.getElementById("checkoutForm"),
  checkoutAlert: document.getElementById("checkoutAlert"),
  customerName: document.getElementById("customerName"),
  customerPhone: document.getElementById("customerPhone"),
  deliveryAddress: document.getElementById("deliveryAddress"),
  nameError: document.getElementById("nameError"),
  phoneError: document.getElementById("phoneError"),
  addressError: document.getElementById("addressError"),
  cartView: document.getElementById("cartView"),
  confirmationView: document.getElementById("confirmationView"),
  confirmationMessage: document.getElementById("confirmationMessage"),
  orderReceipt: document.getElementById("orderReceipt"),
  dismissConfirmationBtn: document.getElementById("dismissConfirmationBtn")
};

// --- App Bootstrap ---
async function init() {
  try {
    const res = await fetch("data/menu.json");
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    state.items = await res.json();
    
    registerEventListeners();
    render();
  } catch (err) {
    elements.menuContainer.innerHTML = `
      <p class="form-alert">Failed to load menu catalog. Please verify data/menu.json exists.</p>
    `;
    console.error("Initialization Error:", err);
  }
}

// --- Event Registrations ---
function registerEventListeners() {
  // Search
  elements.searchInput.addEventListener("input", (e) => {
    state.filters.searchQuery = e.target.value.trim().toLowerCase();
    renderMenu();
  });

  // Category Filtering
  elements.categoryFilters.addEventListener("click", handleCategoryClick);

  // Menu Event Delegation (Add to Cart)
  elements.menuContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (btn) handleAddToCart(btn.dataset.id);
  });

  // Cart Controls Delegation (Increment / Decrement)
  elements.cartItemList.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const { id } = btn.dataset;
    if (btn.classList.contains("btn-inc")) updateCartItemQty(id, 1);
    if (btn.classList.contains("btn-dec")) updateCartItemQty(id, -1);
  });

  // Drawer Controls
  elements.cartToggleBtn.addEventListener("click", () => setCartDrawerOpen(true));
  elements.cartCloseBtn.addEventListener("click", () => setCartDrawerOpen(false));
  elements.cartBackdrop.addEventListener("click", () => setCartDrawerOpen(false));

  // Form Interactions
  elements.checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  elements.customerName.addEventListener("input", () => clearFieldError("customerName", "nameError"));
  elements.customerPhone.addEventListener("input", () => clearFieldError("customerPhone", "phoneError"));
  elements.deliveryAddress.addEventListener("input", () => clearFieldError("deliveryAddress", "addressError"));

  // Dismiss confirmation
  elements.dismissConfirmationBtn.addEventListener("click", () => {
    elements.confirmationView.hidden = true;
    elements.cartView.hidden = false;
    setCartDrawerOpen(false);
  });
}

// --- Event Handlers & Guard Clauses ---
function handleCategoryClick(e) {
  const pill = e.target.closest(".pill");
  if (!pill) return;

  elements.categoryFilters.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  pill.classList.add("active");
  state.filters.category = pill.dataset.category;
  renderMenu();
}

function handleAddToCart(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  const existingCartItem = state.cart.find(i => i.id === itemId);
  if (existingCartItem) {
    existingCartItem.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }

  syncCartStorage();
  renderCart();
}

function updateCartItemQty(itemId, delta) {
  const itemIndex = state.cart.findIndex(i => i.id === itemId);
  if (itemIndex === -1) return;

  state.cart[itemIndex].qty += delta;

  if (state.cart[itemIndex].qty <= 0) {
    state.cart.splice(itemIndex, 1);
  }

  syncCartStorage();
  renderCart();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  // Guard 1: Verify cart is not empty
  if (state.cart.length === 0) {
    showFormAlert("Your cart is empty. Please add items before checking out.");
    return;
  }

  // Form Field Extractions
  const nameVal = elements.customerName.value.trim();
  const phoneVal = elements.customerPhone.value.trim().replace(/\s+/g, "");
  const addressVal = elements.deliveryAddress.value.trim();

  // Guard 2: Run Field Validations
  const isNameValid = validateField(
    elements.customerName, 
    elements.nameError, 
    nameVal.length >= MIN_NAME_LENGTH, 
    "Name must be at least 2 characters long."
  );

  const isPhoneValid = validateField(
    elements.customerPhone, 
    elements.phoneError, 
    ETHIOPIAN_PHONE_REGEX.test(phoneVal), 
    "Valid format: 09XXXXXXXX, 07XXXXXXXX, or +251XXXXXXXXX"
  );

  const isAddressValid = validateField(
    elements.deliveryAddress,
    elements.addressError,
    addressVal.length >= MIN_ADDRESS_LENGTH,
    "Please enter a valid delivery address or landmark."
  );

  if (!isNameValid || !isPhoneValid || !isAddressValid) return;

  // Process Valid Order
  processOrder({
    customer: { name: nameVal, phone: phoneVal, address: addressVal },
    items: [...state.cart],
    total: calculateTotal(state.cart),
    orderId: "ADE-" + Math.floor(100000 + Math.random() * 900000)
  });
}

function processOrder(orderSummary) {
  // Clear cart and state
  resetCart();

  // Switch views inside drawer
  elements.cartView.hidden = true;
  elements.confirmationView.hidden = false;
  elements.checkoutAlert.hidden = true;
  elements.checkoutForm.reset();

  // Render Confirmation Receipt
  elements.confirmationMessage.textContent = `Thank you, ${orderSummary.customer.name}!`;
  elements.orderReceipt.innerHTML = `
    <p><strong>Order ID:</strong> ${orderSummary.orderId}</p>
    <p><strong>Phone:</strong> ${orderSummary.customer.phone}</p>
    <p><strong>Delivery To:</strong> ${orderSummary.customer.address}</p>
    <hr style="margin: 0.5rem 0; border: none; border-top: 1px dashed var(--border);">
    <p><strong>Items Ordered:</strong> ${orderSummary.items.map(i => `${i.name} (x${i.qty})`).join(", ")}</p>
    <p style="margin-top: 0.25rem;"><strong>Total Paid:</strong> ETB ${orderSummary.total}</p>
  `;
}

// --- Validation Helpers ---
function validateField(inputEl, errorEl, condition, errorMessage) {
  if (!condition) {
    inputEl.classList.add("invalid");
    errorEl.textContent = errorMessage;
    return false;
  }
  inputEl.classList.remove("invalid");
  errorEl.textContent = "";
  return true;
}

function clearFieldError(inputName, errorName) {
  elements[inputName].classList.remove("invalid");
  elements[errorName].textContent = "";
  elements.checkoutAlert.hidden = true;
}

function showFormAlert(message) {
  elements.checkoutAlert.textContent = message;
  elements.checkoutAlert.hidden = false;
}

// --- State & Storage Helpers ---
function safelyLoadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Storage corruption detected, resetting cart", err);
    return [];
  }
}

function syncCartStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function resetCart() {
  state.cart = [];
  syncCartStorage();
  renderCart();
}

function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function setCartDrawerOpen(isOpen) {
  elements.cartDrawer.classList.toggle("open", isOpen);
  elements.cartBackdrop.classList.toggle("open", isOpen);
  elements.cartDrawer.setAttribute("aria-hidden", !isOpen);
}

// --- Render Functions ---
function render() {
  renderMenu();
  renderCart();
}

function renderMenu() {
  const { searchQuery, category } = state.filters;

  const filteredItems = state.items.filter(item => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery) || 
                          item.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filteredItems.length === 0) {
    elements.menuContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
        <p>No dishes found matching your selection.</p>
      </div>
    `;
    return;
  }

  elements.menuContainer.innerHTML = filteredItems.map(item => `
    <article class="card">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="card-body">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="card-footer">
          <span class="card-price">ETB ${item.price}</span>
          <button class="btn-add" data-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  const totalQuantity = state.cart.reduce((sum, item) => sum + item.qty, 0);
  elements.cartCount.textContent = totalQuantity;

  if (state.cart.length === 0) {
    elements.cartItemList.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Your cart is empty.</p>`;
    elements.cartTotal.textContent = "ETB 0";
    return;
  }

  elements.cartTotal.textContent = `ETB ${calculateTotal(state.cart)}`;

  elements.cartItemList.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div>
        <h4 style="font-size: 0.95rem;">${item.name}</h4>
        <small style="color: var(--text-muted);">ETB ${item.price} each</small>
      </div>
      <div class="qty-controls">
        <button class="btn-dec" data-id="${item.id}" aria-label="Decrease quantity">-</button>
        <span>${item.qty}</span>
        <button class="btn-inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>
    </div>
  `).join("");
}

// Kickoff
init();