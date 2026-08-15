// Application State (Single source of truth)
const state = {
  rates: {},
  currency: "USD",
  amount: "",
  watchlist: [],
  conversionResult: null,
  errorMsg: "",
  status: { message: "Initializing...", type: "loading" },
  isLoading: true
};

const STORAGE_KEY = "birr_watch_state_v1";
const API_URL = "https://open.er-api.com/v6/latest/ETB";

// DOM Node References
const statusEl = document.querySelector("#status");
const currencySelect = document.querySelector("#currency");
const amountInput = document.querySelector("#amount");
const convertForm = document.querySelector("#convert-form");
const convertBtn = document.querySelector("#convert-btn");
const resultEl = document.querySelector("#result");
const addWatchlistBtn = document.querySelector("#add-watchlist-btn");
const watchlistUl = document.querySelector("#watchlist-ul");

// ==========================================
// RENDER LOOP (State -> UI)
// ==========================================
function render() {
  // 1. Render Status Line
  statusEl.textContent = state.status.message;
  statusEl.className = `status-line ${state.status.type}`;

  // Enable/Disable Form Controls based on Loading State
  currencySelect.disabled = state.isLoading;
  convertBtn.disabled = state.isLoading;
  addWatchlistBtn.disabled = state.isLoading;

  // 2. Render Target Currency Dropdown Options
  const rateKeys = Object.keys(state.rates).sort();
  currencySelect.innerHTML = rateKeys
    .map((code) => `<option value="${code}" ${code === state.currency ? "selected" : ""}>${code}</option>`)
    .join("");

  // Keep input value synchronized with state
  amountInput.value = state.amount;

  // 3. Render Conversion Result Box
  if (state.errorMsg) {
    resultEl.textContent = state.errorMsg;
    resultEl.className = "result-box error-result";
  } else if (state.conversionResult !== null) {
    resultEl.textContent = state.conversionResult;
    resultEl.className = "result-box";
  } else {
    resultEl.className = "result-box hidden";
  }

  // 4. Render Watchlist
  if (state.watchlist.length === 0) {
    watchlistUl.innerHTML = '<li class="empty-state">No currencies in your watchlist yet.</li>';
  } else {
    watchlistUl.innerHTML = state.watchlist
      .map((code) => {
        const rate = state.rates[code];
        const rateDisplay = rate ? `1 ETB = ${Number(rate).toFixed(4)} ${code}` : "Rate pending...";
        return `
          <li class="watchlist-item">
            <div class="watchlist-info">
              <strong>${code}</strong>
              <span class="rate-info">${rateDisplay}</span>
            </div>
            <button type="button" class="btn-delete" data-c="${code}" aria-label="Remove ${code}">✕</button>
          </li>
        `;
      })
      .join("");
  }
}

// ==========================================
// PERSISTENCE (localStorage)
// ==========================================
function saveState() {
  try {
    const payload = {
      watchlist: state.watchlist,
      currency: state.currency
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
}

function loadState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    const parsed = JSON.parse(data);

    if (Array.isArray(parsed.watchlist)) {
      state.watchlist = parsed.watchlist;
    }
    if (typeof parsed.currency === "string" && parsed.currency.trim() !== "") {
      state.currency = parsed.currency;
    }
  } catch (err) {
    console.warn("Corrupt storage data encountered. Resetting state defaults.", err);
  }
}

// ==========================================
// NETWORK / API
// ==========================================
async function loadRates() {
  state.isLoading = true;
  state.status = { message: "Fetching live ETB exchange rates...", type: "loading" };
  render();

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    if (data.result !== "success" || !data.rates) {
      throw new Error("Invalid API payload structure");
    }

    state.rates = data.rates;
    state.isLoading = false;
    state.status = { message: "Rates loaded successfully", type: "success" };

    // Fallback if persisted currency isn't present in API output
    if (!state.rates[state.currency]) {
      state.currency = Object.keys(state.rates)[0] || "USD";
    }
  } catch (err) {
    console.error("API Fetch Error:", err);
    state.isLoading = true;
    state.status = { 
      message: "Failed to load exchange rates. Please check your connection.", 
      type: "error" 
    };
  }

  render();
}

// ==========================================
// EVENT LISTENERS
// ==========================================

// Track currency dropdown changes into State
currencySelect.addEventListener("change", (e) => {
  state.currency = e.target.value;
  state.conversionResult = null;
  state.errorMsg = "";
  saveState();
  render();
});

// Track amount input typing into State
amountInput.addEventListener("input", (e) => {
  state.amount = e.target.value;
});

// Handle Form Submission (Convert Currency)
convertForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const numAmount = Number(state.amount);

  // Input Validation: Reject empty, zero, negative, or NaN
  if (state.amount.trim() === "" || isNaN(numAmount) || numAmount <= 0) {
    state.conversionResult = null;
    state.errorMsg = "Please enter a valid positive numeric amount.";
    render();
    return;
  }

  const rate = state.rates[state.currency];
  if (!rate) {
    state.conversionResult = null;
    state.errorMsg = "Rate not found for the selected currency.";
    render();
    return;
  }

  // Calculate & Format
  const converted = numAmount * rate;
  state.errorMsg = "";
  state.conversionResult = `${numAmount.toLocaleString()} ETB = ${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  })} ${state.currency}`;

  render();
});

// Add Currency to Watchlist (Prevent Duplicates)
addWatchlistBtn.addEventListener("click", () => {
  const code = state.currency;
  if (!code) return;

  if (state.watchlist.includes(code)) {
    state.errorMsg = `${code} is already in your watchlist!`;
    render();
    return;
  }

  state.watchlist.push(code);
  state.errorMsg = "";
  saveState();
  render();
});

// Remove Currency from Watchlist (Event Delegation via data-c)
watchlistUl.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest("button[data-c]");
  if (!deleteBtn) return;

  const codeToRemove = deleteBtn.getAttribute("data-c");
  state.watchlist = state.watchlist.filter((code) => code !== codeToRemove);

  saveState();
  render();
});

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
  loadState();
  render();
  loadRates();
}

document.addEventListener("DOMContentLoaded", init);