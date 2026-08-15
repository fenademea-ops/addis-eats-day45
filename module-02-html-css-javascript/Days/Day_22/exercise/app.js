// Step 1: Declare state object
const state = {
  rates: {},
  watchlist: []
};

const STORAGE_KEY = "birr_watch_data";
const API_URL = "https://open.er-api.com/v6/latest/ETB";

// DOM References
const statusLine = document.getElementById("status-line");
const convertForm = document.getElementById("convert-form");
const amountInput = document.getElementById("amount");
const targetSelect = document.getElementById("target-currency");
const convertBtn = document.getElementById("convert-btn");
const resultBox = document.getElementById("conversion-result");
const addBtn = document.getElementById("add-watchlist-btn");
const watchlistUl = document.getElementById("watchlist-ul");

// Step 6: LocalStorage save and load helpers
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.watchlist));
  } catch (err) {
    console.error("Could not save to localStorage", err);
  }
}

function load() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      state.watchlist = JSON.parse(data);
    }
  } catch (err) {
    console.error("Could not parse watchlist data", err);
    state.watchlist = [];
  }
}

// Step 2 & Step 5: Render functions
function render() {
  // Render currency dropdown options
  targetSelect.innerHTML = '<option value="">-- Select Currency --</option>';
  
  const sortedCurrencies = Object.keys(state.rates).sort();
  sortedCurrencies.forEach((code) => {
    if (code === "ETB") return; // skip base currency
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = code;
    targetSelect.appendChild(opt);
  });

  renderWatchlist();
}

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchlistUl.innerHTML = '<li class="empty">No currencies added to watchlist yet.</li>';
    return;
  }

  watchlistUl.innerHTML = state.watchlist.map((code) => {
    const rate = state.rates[code];
    const rateDisplay = rate ? `1 ETB = ${Number(rate).toFixed(4)} ${code}` : "Rate pending...";
    
    return `
      <li class="watchlist-item">
        <div>
          <strong>${code}</strong>
          <span class="rate-info">${rateDisplay}</span>
        </div>
        <button type="button" class="btn-delete" data-c="${code}">✕</button>
      </li>
    `;
  }).join("");
}

// Step 3: Fetch rates with loading & error handling
async function loadRates() {
  statusLine.className = "status-line loading";
  statusLine.textContent = "Fetching live ETB exchange rates...";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    if (data.result !== "success" || !data.rates) {
      throw new Error("Invalid API payload structure");
    }

    state.rates = data.rates;
    
    statusLine.className = "status-line success";
    statusLine.textContent = "Exchange rates updated successfully";

    // Enable interaction elements once data is available
    targetSelect.disabled = false;
    convertBtn.disabled = false;
    addBtn.disabled = false;

    render();
  } catch (error) {
    console.error("Fetch failed:", error);
    statusLine.className = "status-line error";
    statusLine.textContent = "Failed to load exchange rates. Check your connection.";
  }
}

// Step 4: Wire convert form
convertForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const targetCode = targetSelect.value;

  if (isNaN(amount) || amount <= 0) {
    resultBox.textContent = "Please enter a valid positive amount.";
    resultBox.classList.remove("hidden");
    return;
  }

  if (!targetCode || !state.rates[targetCode]) {
    resultBox.textContent = "Please select a target currency.";
    resultBox.classList.remove("hidden");
    return;
  }

  const rate = state.rates[targetCode];
  const converted = amount * rate;

  resultBox.textContent = `${amount.toLocaleString()} ETB = ${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  })} ${targetCode}`;
  
  resultBox.classList.remove("hidden");
});

// Step 5: Add to watchlist (no duplicates)
addBtn.addEventListener("click", () => {
  const selected = targetSelect.value;
  if (!selected) {
    alert("Please select a target currency from the dropdown first.");
    return;
  }

  if (state.watchlist.includes(selected)) {
    alert(`${selected} is already in your watchlist!`);
    return;
  }

  state.watchlist.push(selected);
  save();
  renderWatchlist();
});

// Step 5: Delegated click listener to remove watchlist row by data-c
watchlistUl.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest("button[data-c]");
  if (!deleteBtn) return;

  const codeToDelete = deleteBtn.getAttribute("data-c");
  state.watchlist = state.watchlist.filter((code) => code !== codeToDelete);
  save();
  renderWatchlist();
});

// Step 6: Initialization
function init() {
  load(); // Load watchlist from localStorage
  loadRates(); // Fetch live rates and render UI
}

document.addEventListener("DOMContentLoaded", init);