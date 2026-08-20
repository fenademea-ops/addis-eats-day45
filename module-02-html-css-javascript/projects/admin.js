

const KEYS = {
  MENU: 'addiseats_menu',
  CATEGORIES: 'addiseats_categories',
  ORDERS: 'addiseats_orders',
  THEME: 'addiseats_theme'
};

const DEFAULT_CATEGORIES = [
  { id: 'fasting_shiro', name: 'Shiro Specialties', nameAm: 'የሽሮ ምግቦች', icon: '🍲', isEnabled: true },
  { id: 'vegan_fasting', name: 'Fasting & Vegan', nameAm: 'የጾም በያይነቱ እና ወጦች', icon: '🥗', isEnabled: true },
  { id: 'meat_wats', name: 'Meat Wats', nameAm: 'የባህል የሥጋ ወጦች', icon: '🍗', isEnabled: true },
  { id: 'tibs_grills', name: 'Tibs & Grills', nameAm: 'ጥብስ እና የፍርፍር ጥብስ', icon: '🔥', isEnabled: true },
  { id: 'kitfo_raw', name: 'Kitfo & Raw Meat', nameAm: 'ክትፎ እና ጥሬ ሥጋ', icon: '🥩', isEnabled: true },
  { id: 'breakfast', name: 'Breakfast', nameAm: 'የባህል ቁርስ', icon: '🍳', isEnabled: true },
  { id: 'firfir_dishes', name: 'Injera Firfir', nameAm: 'የፍርፍር ምግቦች', icon: '🌶️', isEnabled: true },
  { id: 'fish_seafood', name: 'Fish & Seafood', nameAm: 'የዓሣ ምግቦች', icon: '🐟', isEnabled: true },
  { id: 'pizzas', name: 'Pizzas', nameAm: 'ፒዛ', icon: '🍕', isEnabled: true },
  { id: 'pastas', name: 'Pastas', nameAm: 'ፓስታ', icon: '🍝', isEnabled: true },
  { id: 'burgers_sandwiches', name: 'Burgers & Sandwiches', nameAm: 'በርገር እና ሳንድዊች', icon: '🍔', isEnabled: true },
  { id: 'fried_chicken', name: 'Fried Chicken', nameAm: 'የተጠበሰ ዶሮ', icon: '🍗', isEnabled: true },
  { id: 'fresh_juices', name: 'Fresh Juices', nameAm: 'ትኩስ ጭማቂዎች', icon: '🍹', isEnabled: true },
  { id: 'hot_beverages', name: 'Coffee & Tea', nameAm: 'ትኩስ መጠጦች እና ቡና', icon: '☕', isEnabled: true },
  { id: 'desserts', name: 'Desserts', nameAm: 'ጣፋጭ ምግቦች', icon: '🥮', isEnabled: true }
];

let adminState = {
  menu: [],
  categories: [],
  orders: [],
  currentTab: 'analyticsSection',
  dishSearch: '',
  orderSearch: '',
  orderStatusFilter: 'all'
};

document.addEventListener('DOMContentLoaded', async () => {
  if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.replace('admin-login.html');
    return;
  }

  loadAdminData();
  setupAdminNavigation();
  setupAdminEventListeners();
  populateCategorySelect();
  renderAllSections();
});

function loadAdminData() {
  adminState.menu = JSON.parse(localStorage.getItem(KEYS.MENU) || '[]');
  adminState.categories = JSON.parse(localStorage.getItem(KEYS.CATEGORIES) || JSON.stringify(DEFAULT_CATEGORIES));
  adminState.orders = JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');

  const theme = localStorage.getItem(KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('adminThemeIcon');
  if (icon) icon.textContent = theme === 'light' ? '🌙' : '☀️';
}

function saveMenu() { localStorage.setItem(KEYS.MENU, JSON.stringify(adminState.menu)); }
function saveCategories() { localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(adminState.categories)); }
function saveOrders() { localStorage.setItem(KEYS.ORDERS, JSON.stringify(adminState.orders)); }

function toggleSidebar(forceState) {
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('adminSidebarBackdrop');
  if (!sidebar) return;

  const isMobile = window.innerWidth <= 900;
  if (isMobile) {
    const shouldOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('open');
    if (shouldOpen) {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
    } else {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
    }
  } else {
    const shouldCollapse = forceState !== undefined ? !forceState : !sidebar.classList.contains('collapsed');
    if (shouldCollapse) {
      sidebar.classList.add('collapsed');
    } else {
      sidebar.classList.remove('collapsed');
    }
  }
}

function setupAdminNavigation() {
  const navBtns = document.querySelectorAll('.admin-nav-item[data-section]');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.section;
      adminState.currentTab = target;

      document.querySelectorAll('.admin-tab-content').forEach(sec => sec.style.display = 'none');
      document.getElementById(target).style.display = 'block';

      const titles = {
        analyticsSection: 'Executive Analytics Dashboard',
        ordersSection: 'Live Kitchen & Customer Orders',
        dishesSection: 'Menu Management & Stock Availability',
        categoriesSection: '15-Category Operations Controller'
      };
      document.getElementById('pageTitle').textContent = titles[target] || 'Admin Dashboard';
      toggleSidebar(false);
    });
  });
}

function setupAdminEventListeners() {
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarBackdrop = document.getElementById('adminSidebarBackdrop');

  if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', () => toggleSidebar());
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', () => toggleSidebar(false));
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', () => toggleSidebar(false));

  document.getElementById('adminLogoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.replace('admin-login.html');
  });

  document.getElementById('resetDataBtn').addEventListener('click', handleFactoryReset);

  document.getElementById('adminThemeToggleBtn').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(KEYS.THEME, next);
    document.getElementById('adminThemeIcon').textContent = next === 'light' ? '🌙' : '☀️';
  });

  document.getElementById('dishSearchInput').addEventListener('input', (e) => {
    adminState.dishSearch = e.target.value.toLowerCase().trim();
    renderDishesTable();
  });

  document.getElementById('orderSearchInput').addEventListener('input', (e) => {
    adminState.orderSearch = e.target.value.toLowerCase().trim();
    renderOrdersTable();
  });

  document.getElementById('orderStatusFilter').addEventListener('change', (e) => {
    adminState.orderStatusFilter = e.target.value;
    renderOrdersTable();
  });

  document.getElementById('openAddDishModalBtn').addEventListener('click', () => openDishModal());
  document.getElementById('closeDishModalBtn').addEventListener('click', closeDishModal);
  document.getElementById('cancelDishFormBtn').addEventListener('click', closeDishModal);
  document.getElementById('dishForm').addEventListener('submit', handleDishFormSubmit);

  document.getElementById('closeAdminOrderModalBtn').addEventListener('click', () => {
    document.getElementById('adminOrderModalBackdrop').classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleSidebar(false);
      closeDishModal();
      document.getElementById('adminOrderModalBackdrop').classList.remove('open');
    }
  });
}

function renderAllSections() {
  renderAnalytics();
  renderOrdersTable();
  renderDishesTable();
  renderCategoryManager();
}

function renderAnalytics() {
  const orders = adminState.orders;
  const totalRev = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.pricing?.grandTotal || 0), 0);

  const totalCount = orders.length;
  const aov = totalCount > 0 ? (totalRev / totalCount) : 0;
  const activeKitchenCount = orders.filter(o => ['pending', 'preparing', 'delivering'].includes(o.status)).length;

  document.getElementById('kpiRevenue').textContent = `${totalRev.toFixed(2)} ETB`;
  document.getElementById('kpiOrdersCount').textContent = totalCount;
  document.getElementById('kpiAOV').textContent = `${aov.toFixed(2)} ETB`;
  document.getElementById('kpiActiveKitchen').textContent = activeKitchenCount;
  document.getElementById('sidebarPendingCount').textContent = activeKitchenCount;

  renderStatusDistribution();
  renderTopSellingDishes();
}

function renderStatusDistribution() {
  const container = document.getElementById('statusDistributionContainer');
  const counts = { pending: 0, preparing: 0, delivering: 0, delivered: 0, cancelled: 0 };

  adminState.orders.forEach(o => {
    if (counts[o.status] !== undefined) counts[o.status]++;
  });

  const total = adminState.orders.length || 1;
  const statuses = [
    { key: 'pending', label: 'Pending (New Orders)', color: '#d97706' },
    { key: 'preparing', label: 'In Kitchen (Preparing)', color: '#0284c7' },
    { key: 'delivering', label: 'Out for Delivery (Rider)', color: '#7e22ce' },
    { key: 'delivered', label: 'Delivered (Completed)', color: '#16a34a' },
    { key: 'cancelled', label: 'Cancelled', color: '#dc2626' }
  ];

  container.innerHTML = statuses.map(s => {
    const count = counts[s.key];
    const pct = Math.round((count / total) * 100);
    return `
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 3px;">
          <span><strong>${s.label}</strong></span>
          <span>${count} (${pct}%)</span>
        </div>
        <div style="height: 8px; background: var(--admin-border); border-radius: 9999px; overflow: hidden;">
          <div style="width: ${pct}%; height: 100%; background: ${s.color}; border-radius: 9999px;"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderTopSellingDishes() {
  const container = document.getElementById('topDishesContainer');
  const dishSales = {};

  adminState.orders.forEach(order => {
    if (order.status === 'cancelled') return;
    (order.items || []).forEach(item => {
      dishSales[item.name] = (dishSales[item.name] || 0) + item.quantity;
    });
  });

  const sorted = Object.entries(dishSales).sort((a, b) => b[1] - a[1]).slice(0, 5);

  if (sorted.length === 0) {
    container.innerHTML = `<p style="font-size: 0.85rem; color: var(--admin-text-muted);">No dish sales recorded yet.</p>`;
    return;
  }

  container.innerHTML = sorted.map(([name, qty], index) => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--admin-bg); border-radius: 8px;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-weight: 800; font-size: 0.9rem; color: var(--admin-primary); width: 20px;">#${index + 1}</span>
        <span style="font-size: 0.85rem; font-weight: 600;">${name}</span>
      </div>
      <span style="font-family: 'JetBrains Mono'; font-weight: 700; font-size: 0.85rem;">${qty} sold</span>
    </div>
  `).join('');
}

function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  let filtered = adminState.orders.filter(order => {
    if (adminState.orderStatusFilter !== 'all' && order.status !== adminState.orderStatusFilter) return false;
    if (adminState.orderSearch) {
      const q = adminState.orderSearch;
      const matchId = order.orderId.toLowerCase().includes(q);
      const matchName = order.customer.name.toLowerCase().includes(q);
      const matchPhone = order.customer.phone.includes(q);
      const matchSubCity = order.customer.subCity.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone && !matchSubCity) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--admin-text-muted);">No orders found matching filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(order => {
    const itemsSummary = (order.items || []).map(i => `${i.quantity}x ${i.name}`).join(', ');

    return `
      <tr id="order-row-${order.orderId}">
        <td><strong style="font-family: 'JetBrains Mono'; color: var(--admin-primary);">${order.orderId}</strong></td>
        <td>
          <div style="font-weight: 700;">${order.customer.name}</div>
          <div style="font-size: 0.75rem; color: var(--admin-text-muted);">${order.customer.phone}</div>
        </td>
        <td><strong>${order.customer.subCity}</strong></td>
        <td style="max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${itemsSummary}">
          ${itemsSummary}
        </td>
        <td><strong style="font-family: 'JetBrains Mono';">${order.pricing.grandTotal.toFixed(2)}</strong></td>
        <td><span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">${order.payment.method}</span></td>
        <td>
          <select 
            class="form-select" 
            style="padding: 4px 8px; font-size: 0.75rem; font-weight: 700;"
            onchange="updateOrderStatus('${order.orderId}', this.value)"
          >
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>⏳ Pending</option>
            <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>👨‍🍳 Preparing</option>
            <option value="delivering" ${order.status === 'delivering' ? 'selected' : ''}>🛵 Delivering</option>
            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>✅ Delivered</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>❌ Cancelled</option>
          </select>
        </td>
        <td>
          <div style="display: flex; gap: 4px;">
            <button class="btn-admin" style="background: var(--admin-border); padding: 4px 8px; font-size: 0.75rem;" onclick="viewOrderDetails('${order.orderId}')" title="View Details">
              👁️
            </button>
            <button class="btn-admin btn-admin-danger" style="padding: 4px 8px; font-size: 0.75rem;" onclick="deleteOrder('${order.orderId}')" title="Delete">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const order = adminState.orders.find(o => o.orderId === orderId);
  if (!order) return;

  order.status = newStatus;
  saveOrders();
  renderAnalytics();
  showAdminToast(`Order ${orderId} updated to "${newStatus}"`, 'success');
}

function deleteOrder(orderId) {
  if (!confirm(`Are you sure you want to permanently delete Order ${orderId}?`)) return;
  adminState.orders = adminState.orders.filter(o => o.orderId !== orderId);
  saveOrders();
  renderOrdersTable();
  renderAnalytics();
  showAdminToast(`Order ${orderId} deleted`, 'info');
}

function viewOrderDetails(orderId) {
  const order = adminState.orders.find(o => o.orderId === orderId);
  if (!order) return;

  const content = document.getElementById('adminOrderModalContent');
  document.getElementById('adminOrderModalTitle').textContent = `Order Breakdown #${order.orderId}`;

  content.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <h4 style="font-size: 0.85rem; color: var(--admin-text-muted); margin-bottom: 4px;">CUSTOMER DETAILS</h4>
      <p><strong>Name:</strong> ${order.customer.name}</p>
      <p><strong>Phone:</strong> ${order.customer.phone}</p>
      <p><strong>Area / Sub-City:</strong> ${order.customer.subCity}</p>
      <p><strong>Address:</strong> ${order.customer.specificAddress}</p>
      ${order.customer.orderNotes ? `<p style="color: var(--admin-warning);"><strong>Notes:</strong> ${order.customer.orderNotes}</p>` : ''}
    </div>

    <div style="margin-bottom: 1rem;">
      <h4 style="font-size: 0.85rem; color: var(--admin-text-muted); margin-bottom: 4px;">ORDERED DISHES</h4>
      <div style="background: var(--admin-bg); padding: 8px 12px; border-radius: 8px;">
        ${order.items.map(item => `
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 4px 0; border-bottom: 1px dashed var(--admin-border);">
            <span>${item.quantity}x ${item.name} ${item.notes ? `<em>(${item.notes})</em>` : ''}</span>
            <strong>${(item.price * item.quantity).toFixed(2)} ETB</strong>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; font-size: 1rem; font-weight: 800; border-top: 2px solid var(--admin-border); padding-top: 8px;">
      <span>Grand Total:</span>
      <span style="color: var(--admin-primary); font-family: 'JetBrains Mono';">${order.pricing.grandTotal.toFixed(2)} ETB</span>
    </div>
  `;

  document.getElementById('adminOrderModalBackdrop').classList.add('open');
}

function renderDishesTable() {
  const tbody = document.getElementById('dishesTableBody');
  let filtered = adminState.menu.filter(dish => {
    if (adminState.dishSearch) {
      const q = adminState.dishSearch;
      const matchName = dish.name.toLowerCase().includes(q);
      const matchNameAm = dish.nameAm ? dish.nameAm.toLowerCase().includes(q) : false;
      const matchCat = dish.category.toLowerCase().includes(q);
      if (!matchName && !matchNameAm && !matchCat) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--admin-text-muted);">No dishes found in menu.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(dish => {
    const isAvailable = dish.isAvailable !== false;
    const catObj = adminState.categories.find(c => c.id === dish.category);
    const catName = catObj ? catObj.name : dish.category;

    return `
      <tr id="dish-row-${dish.id}">
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${dish.image}" alt="${dish.name}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;">
            <div>
              <strong style="font-size: 0.9rem;">${dish.name}</strong>
              <div style="font-size: 0.75rem; color: var(--admin-text-muted);">${dish.nameAm || ''}</div>
            </div>
          </div>
        </td>
        <td><span style="background: var(--admin-border); padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${catName}</span></td>
        <td><strong style="font-family: 'JetBrains Mono';">${dish.price.toFixed(2)}</strong></td>
        <td><strong>${dish.stock || 20}</strong></td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label class="switch">
              <input type="checkbox" ${isAvailable ? 'checked' : ''} onchange="toggleDishAvailability(${dish.id}, this.checked)">
              <span class="slider"></span>
            </label>
            <span style="font-size: 0.75rem; font-weight: 700; ${isAvailable ? 'color: var(--admin-success);' : 'color: var(--admin-danger);'}">
              ${isAvailable ? 'In Stock 🟢' : 'Sold Out / አልቋል 🔴'}
            </span>
          </div>
        </td>
        <td>
          <div style="display: flex; gap: 4px;">
            <button class="btn-admin" style="background: var(--admin-border); padding: 4px 8px; font-size: 0.75rem;" onclick="openDishModal(${dish.id})" title="Edit">
              ✏️ Edit
            </button>
            <button class="btn-admin btn-admin-danger" style="padding: 4px 8px; font-size: 0.75rem;" onclick="deleteDish(${dish.id})" title="Delete">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleDishAvailability(dishId, isChecked) {
  const dish = adminState.menu.find(d => d.id === dishId);
  if (!dish) return;

  dish.isAvailable = isChecked;
  saveMenu();
  renderDishesTable();

  const msg = isChecked 
    ? `"${dish.name}" is now IN STOCK 🟢` 
    : `"${dish.name}" marked as SOLD OUT / OUT OF STOCK 🔴`;
  showAdminToast(msg, isChecked ? 'success' : 'error');
}

function deleteDish(dishId) {
  const dish = adminState.menu.find(d => d.id === dishId);
  if (!confirm(`Are you sure you want to remove "${dish ? dish.name : 'this dish'}" from the menu?`)) return;

  adminState.menu = adminState.menu.filter(d => d.id !== dishId);
  saveMenu();
  renderDishesTable();
  renderAnalytics();
  showAdminToast('Dish removed from menu', 'info');
}

function openDishModal(dishId = null) {
  const modal = document.getElementById('dishModalBackdrop');
  const title = document.getElementById('dishModalTitle');
  const form = document.getElementById('dishForm');

  form.reset();

  if (dishId) {
    const dish = adminState.menu.find(d => d.id === dishId);
    if (!dish) return;

    title.textContent = `Edit Dish: ${dish.name}`;
    document.getElementById('dishFormId').value = dish.id;
    document.getElementById('dishFormName').value = dish.name;
    document.getElementById('dishFormNameAm').value = dish.nameAm || '';
    document.getElementById('dishFormPrice').value = dish.price;
    document.getElementById('dishFormCategory').value = dish.category;
    document.getElementById('dishFormStock').value = dish.stock || 20;
    document.getElementById('dishFormDesc').value = dish.description;
    document.getElementById('dishFormIngredients').value = (dish.ingredients || []).join(', ');
    document.getElementById('dishFormImage').value = dish.image || 'images/kitfo.svg';
    document.getElementById('dishFormFasting').checked = !!dish.isFasting;
  } else {
    title.textContent = 'Add New Dish to Menu';
    document.getElementById('dishFormId').value = '';
    document.getElementById('dishFormImage').value = 'images/doro-wat.svg';
  }

  modal.classList.add('open');
}

function closeDishModal() { document.getElementById('dishModalBackdrop').classList.remove('open'); }

function handleDishFormSubmit(e) {
  e.preventDefault();

  const idVal = document.getElementById('dishFormId').value;
  const name = document.getElementById('dishFormName').value.trim();
  const nameAm = document.getElementById('dishFormNameAm').value.trim();
  const price = parseFloat(document.getElementById('dishFormPrice').value);
  const category = document.getElementById('dishFormCategory').value;
  const stock = parseInt(document.getElementById('dishFormStock').value, 10);
  const description = document.getElementById('dishFormDesc').value.trim();
  const ingStr = document.getElementById('dishFormIngredients').value.trim();
  const image = document.getElementById('dishFormImage').value.trim() || 'images/doro-wat.svg';
  const isFasting = document.getElementById('dishFormFasting').checked;

  const ingredients = ingStr ? ingStr.split(',').map(s => s.trim()).filter(Boolean) : [];

  if (idVal) {
    const dish = adminState.menu.find(d => d.id === parseInt(idVal, 10));
    if (dish) {
      dish.name = name;
      dish.nameAm = nameAm;
      dish.price = price;
      dish.category = category;
      dish.stock = stock;
      dish.description = description;
      dish.ingredients = ingredients;
      dish.image = image;
      dish.isFasting = isFasting;
    }
    showAdminToast(`Updated "${name}" successfully!`, 'success');
  } else {
    const newId = Date.now();
    const newDish = {
      id: newId,
      name,
      nameAm,
      price,
      category,
      stock,
      description,
      ingredients,
      image,
      isFasting,
      isAvailable: true,
      rating: 5.0,
      reviewsCount: 1
    };
    adminState.menu.unshift(newDish);
    showAdminToast(`Added "${name}" to menu!`, 'success');
  }

  saveMenu();
  renderDishesTable();
  closeDishModal();
}

function populateCategorySelect() {
  const select = document.getElementById('dishFormCategory');
  select.innerHTML = adminState.categories.map(c => `
    <option value="${c.id}">${c.icon || ''} ${c.name} (${c.nameAm || ''})</option>
  `).join('');
}

function renderCategoryManager() {
  const container = document.getElementById('categoryManagerGrid');

  container.innerHTML = adminState.categories.map(cat => {
    const isEnabled = cat.isEnabled !== false;

    return `
      <div class="category-manager-card" id="cat-card-${cat.id}">
        <div>
          <div style="font-size: 1.1rem; margin-bottom: 2px;">${cat.icon || '🍽️'} <strong>${cat.name}</strong></div>
          <div style="font-size: 0.8rem; color: var(--admin-text-muted);">${cat.nameAm || ''}</div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <label class="switch">
            <input type="checkbox" ${isEnabled ? 'checked' : ''} onchange="toggleCategoryEnabled('${cat.id}', this.checked)">
            <span class="slider"></span>
          </label>
          <span style="font-size: 0.75rem; font-weight: 700; ${isEnabled ? 'color: var(--admin-success);' : 'color: var(--admin-danger);'}">
            ${isEnabled ? 'Active' : 'Disabled'}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function toggleCategoryEnabled(categoryId, isChecked) {
  const cat = adminState.categories.find(c => c.id === categoryId);
  if (!cat) return;

  cat.isEnabled = isChecked;
  saveCategories();
  renderCategoryManager();

  const msg = isChecked 
    ? `Category "${cat.name}" is now ENABLED on customer storefront.` 
    : `Category "${cat.name}" is now DISABLED on customer storefront.`;
  showAdminToast(msg, isChecked ? 'success' : 'info');
}

async function handleFactoryReset() {
  if (!confirm('Reset all menu items, categories, and load demo orders?')) return;

  try {
    const resp = await fetch('data/menu.json');
    if (resp.ok) {
      const data = await resp.json();
      if (data.categories && data.dishes) {
        adminState.menu = data.dishes;
        adminState.categories = data.categories;
      } else if (Array.isArray(data)) {
        adminState.menu = data;
        adminState.categories = DEFAULT_CATEGORIES;
      }
    }
  } catch (e) {
    adminState.categories = DEFAULT_CATEGORIES;
  }
  
  // ... rest of the function stays the same (demo orders, save, render) ...

  
  adminState.orders = [
    {
      orderId: 'ADE-89410',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      customer: {
        name: 'Abebe Bikila',
        phone: '0911234567',
        subCity: 'Bole',
        specificAddress: 'Atlas Hotel, House 102',
        orderNotes: 'Extra berbere sauce please'
      },
      items: [
        { id: 101, name: 'Special Doro Wat', price: 480, quantity: 2 },
        { id: 115, name: 'Fresh Juice Spris', price: 180, quantity: 2 }
      ],
      payment: { method: 'telebirr', status: 'Paid', reference: 'TB-84920' },
      pricing: { subtotal: 1320, deliveryFee: 100, discount: 0, grandTotal: 1420 },
      status: 'delivering'
    },
    {
      orderId: 'ADE-89411',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      customer: {
        name: 'Sara Tesfaye',
        phone: '0922334455',
        subCity: 'Kazanchis',
        specificAddress: 'Near UNECA, Block B',
        orderNotes: ''
      },
      items: [
        { id: 103, name: 'Shiro Tegabino', price: 280, quantity: 1 },
        { id: 106, name: 'Special Kitfo', price: 540, quantity: 1 }
      ],
      payment: { method: 'cbe_birr', status: 'Paid', reference: 'CBE-3948' },
      pricing: { subtotal: 820, deliveryFee: 80, discount: 0, grandTotal: 900 },
      status: 'delivered'
    }
  ];

  saveMenu();
  saveCategories();
  saveOrders();
  renderAllSections();
  showAdminToast('Demo data restored successfully!', 'success');
}

function showAdminToast(message, type = 'info') {
  const container = document.getElementById('adminToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}
