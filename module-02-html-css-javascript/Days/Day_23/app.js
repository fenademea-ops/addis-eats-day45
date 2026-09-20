// --- Application State ---
const state = {
  items: [],
  filters: {
    searchQuery: "",
    category: "all"
  },
  cart: JSON.parse(localStorage.getItem("addis_cart")) || []
};

// --- DOM Selectors ---
const menuContainer = document.getElementById("menuContainer");
const categoryFilters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartToggleBtn = document.getElementById("cartToggleBtn");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartItemList = document.getElementById("cartItemList");
const cartTotal = document.getElementById("cartTotal");

// --- Initialization & Data Fetching ---
async function init() {
  try {
    const res = await fetch("data/menu.json");
    if (!res.ok) throw new Error("Failed to load catalog data");
    state.items = await res.json();
    setupEventListeners();
    render();
  } catch (err) {
    menuContainer.innerHTML = `<p class="error">Unable to load menu. Make sure 'data/menu.json' exists.</p>`;
    console.error(err);
  }
}

// --- Event Listeners ---
function setupEventListeners() {
  // Live search filtering
  searchInput.addEventListener("input", (e) => {
    state.filters.searchQuery = e.target.value.trim().toLowerCase();
    renderMenu();
  });

  // Category pill filtering
  categoryFilters.addEventListener("click", (e) => {
    const pill = e.target.closest("button.pill");
    if (!pill) return;
    
    categoryFilters.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    state.filters.category = pill.dataset.category;
    renderMenu();
  });

  // Menu delegation: Add to Cart
  menuContainer.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".btn-add");
    if (addBtn) addToCart(addBtn.dataset.id);
  });

  // Cart quantity controls
  cartItemList.addEventListener("click", (e) => {
    const target = e.target;
    const id = target.dataset.id;
    if (target.matches(".btn-inc")) updateQuantity(id, 1);
    if (target.matches(".btn-dec")) updateQuantity(id, -1);
  });

  // Drawer toggles
  cartToggleBtn.addEventListener("click", () => toggleCart(true));
  cartCloseBtn.addEventListener("click", () => toggleCart(false));
  cartBackdrop.addEventListener("click", () => toggleCart(false));
}

// --- Cart Operations ---
function addToCart(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  const existing = state.cart.find(i => i.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }

  saveCart();
  renderCart();
}

function updateQuantity(itemId, delta) {
  const item = state.cart.find(i => i.id === itemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== itemId);
  }

  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("addis_cart", JSON.stringify(state.cart));
}

function toggleCart(isOpen) {
  cartDrawer.classList.toggle("open", isOpen);
  cartBackdrop.classList.toggle("open", isOpen);
  cartDrawer.setAttribute("aria-hidden", !isOpen);
}

// --- Render Pipeline ---
function render() {
  renderMenu();
  renderCart();
}

function renderMenu() {
  const { searchQuery, category } = state.filters;
  
  const filtered = state.items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                          item.description.toLowerCase().includes(searchQuery);
    const matchesCategory = category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    menuContainer.innerHTML = `<p class="no-results">No dishes found matching your selection.</p>`;
    return;
  }

  menuContainer.innerHTML = filtered.map(item => `
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
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalCount;

  if (state.cart.length === 0) {
    cartItemList.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
    cartTotal.textContent = "ETB 0";
    return;
  }

  const grandTotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  cartTotal.textContent = `ETB ${grandTotal}`;

  cartItemList.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div>
        <h4>${item.name}</h4>
        <small>ETB ${item.price} each</small>
      </div>
      <div class="qty-controls">
        <button class="btn-dec" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button class="btn-inc" data-id="${item.id}">+</button>
      </div>
    </div>
  `).join("");
}

// Start application
init();