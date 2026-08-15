document.addEventListener("DOMContentLoaded", () => {
  // App State Container
  const state = {
    rates: {},
    baseCurrency: "ETB",
    watchlist: [],
  };

  const STORAGE_KEY = "birr_watch_state";
  const API_URL = "https://open.er-api.com/v6/latest/ETB";

  // DOM Elements
  const statusLine = document.getElementById("status-line");
  const convertForm = document.getElementById("convert-form");
  const amountInput = document.getElementById("amount");
  const targetCurrencySelect = document.getElementById("target-currency");
  const convertBtn = document.getElementById("convert-btn");
  const conversionResult = document.getElementById("conversion-result");
  const addWatchlistBtn = document.getElementById("add-watchlist-btn");
  const watchlistContainer = document.getElementById("watchlist-container");

  // ==========================================
  // LocalStorage Helpers
  // ==========================================
  function loadState() {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      if (rawData === null) return;
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed.watchlist)) {
        state.watchlist = parsed.watchlist;
      }
    } catch (error) {
      console.warn("Corrupt storage data detected; starting with empty state.", error);
      state.watchlist = [];
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ watchlist: state.watchlist }));
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }
  }

  // ==========================================
  // Fetch Rates from API
  // ==========================================
  async function loadRates() {
    updateStatus("Fetching live ETB exchange rates...", "loading");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.result !== "success" || !data.rates) {
        throw new Error("Invalid exchange rate payload received.");
      }

      state.rates = data.rates;
      updateStatus("Rates updated successfully", "success");

      renderCurrencyDropdown();
      renderWatchlist();

      // Enable form controls
      targetCurrencySelect.disabled = false;
      convertBtn.disabled = false;
      addWatchlistBtn.disabled = false;
    } catch (error) {
      console.error("Failed to fetch rates:", error);
      updateStatus("Failed to load exchange rates. Check your connection.", "error");
    }
  }

  // ==========================================
  // Status Line Renderer
  // ==========================================
  function updateStatus(message, type) {
    statusLine.textContent = message;
    statusLine.className = `status-line ${type}`;
  }

  // ==========================================
  // Render Dropdown
  // ==========================================
  function renderCurrencyDropdown() {
    targetCurrencySelect.innerHTML = '<option value="">-- Select Currency --</option>';

    const currencies = Object.keys(state.rates).sort();
    currencies.forEach((code) => {
      if (code === state.baseCurrency) return; // Skip base currency
      const option = document.createElement("option");
      option.value = code;
      option.textContent = code;
      targetCurrencySelect.appendChild(option);
    });
  }

  // ==========================================
  // Convert Handler
  // ==========================================
  convertForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    const targetCode = targetCurrencySelect.value;

    // Validation
    if (isNaN(amount) || amount <= 0) {
      conversionResult.textContent = "Please enter a valid amount greater than 0.";
      conversionResult.classList.remove("hidden");
      return;
    }

    if (!targetCode || !state.rates[targetCode]) {
      conversionResult.textContent = "Please select a target currency.";
      conversionResult.classList.remove("hidden");
      return;
    }

    const rate = state.rates[targetCode];
    const converted = amount * rate;

    conversionResult.textContent = `${amount.toLocaleString()} ETB = ${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })} ${targetCode}`;

    conversionResult.classList.remove("hidden");
  });

  // ==========================================
  // Watchlist Management
  // ==========================================
  addWatchlistBtn.addEventListener("click", () => {
    const selectedCode = targetCurrencySelect.value;

    if (!selectedCode) {
      alert("Please select a currency from the dropdown first!");
      return;
    }

    // Prevent duplicates
    if (state.watchlist.includes(selectedCode)) {
      alert(`${selectedCode} is already in your watchlist.`);
      return;
    }

    state.watchlist.push(selectedCode);
    saveState();
    renderWatchlist();
  });

  // Render Watchlist
  function renderWatchlist() {
    if (state.watchlist.length === 0) {
      watchlistContainer.innerHTML = '<p class="empty-msg">No currencies in your watchlist yet.</p>';
      return;
    }

    watchlistContainer.innerHTML = "";

    state.watchlist.forEach((code) => {
      const rate = state.rates[code];
      const rateText = rate
        ? `1 ETB = ${rate.toFixed(4)} ${code}`
        : "Rate unavailable";

      const item = document.createElement("div");
      item.className = "watchlist-item";
      item.innerHTML = `
        <div class="watchlist-info">
          <span class="watchlist-code">${code}</span>
          <span class="watchlist-rate">${rateText}</span>
        </div>
        <button class="btn-delete" data-code="${code}" aria-label="Remove ${code} from watchlist">✕</button>
      `;

      watchlistContainer.appendChild(item);
    });
  }

  // Delete via Event Delegation
  watchlistContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-delete")) {
      const codeToDelete = event.target.getAttribute("data-code");
      state.watchlist = state.watchlist.filter((code) => code !== codeToDelete);
      saveState();
      renderWatchlist();
    }
  });

  // ==========================================
  // Startup Execution Flow
  // ==========================================
  loadState();
  loadRates();
});