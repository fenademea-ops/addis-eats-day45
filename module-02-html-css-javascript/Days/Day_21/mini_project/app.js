document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const form = document.getElementById("signup-form");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const nameError = document.getElementById("name-error");
  const phoneError = document.getElementById("phone-error");
  const formError = document.getElementById("form-error");
  const statsCount = document.getElementById("stats-count");
  const themeToggleBtn = document.getElementById("theme-toggle");

  const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
  const STORAGE_KEY = "signups";

  // ==========================================
  // Theme Toggle Persistence
  // ==========================================
  const storedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeButton(storedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = activeTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeButton(nextTheme);
  });

  function updateThemeButton(theme) {
    themeToggleBtn.innerHTML = theme === "dark"
      ? `<span class="theme-icon">☀️</span> Light Mode`
      : `<span class="theme-icon">🌙</span> Dark Mode`;
  }

  // ==========================================
  // Storage Helpers (handles null & corrupt data)
  // ==========================================
  function loadSignups() {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      if (rawData === null) return [];
      const parsed = JSON.parse(rawData);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn("Corrupt JSON detected in localStorage, falling back to empty array.", error);
      return [];
    }
  }

  function saveSignups(dataArray) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataArray));
    } catch (error) {
      console.error("Failed to write signups to localStorage:", error);
    }
  }

  // Helper to normalize phone numbers for duplicate checking
  function normalizePhone(phone) {
    if (phone.startsWith("+251")) {
      return "0" + phone.slice(4);
    }
    return phone;
  }

  // ==========================================
  // UI Helpers
  // ==========================================
  function clearErrors() {
    nameError.textContent = "";
    phoneError.textContent = "";
    formError.textContent = "";
    nameInput.classList.remove("invalid");
    phoneInput.classList.remove("invalid");
  }

  function renderStats() {
    const signups = loadSignups();
    statsCount.textContent = signups.length;
  }

  // Clear errors dynamically when typing
  nameInput.addEventListener("input", () => {
    nameInput.classList.remove("invalid");
    nameError.textContent = "";
    formError.textContent = "";
  });

  phoneInput.addEventListener("input", () => {
    phoneInput.classList.remove("invalid");
    phoneError.textContent = "";
    formError.textContent = "";
  });

  // ==========================================
  // Form Submit Handler
  // ==========================================
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // 1. Validate Name
    if (name.length < 2) {
      nameInput.classList.add("invalid");
      nameError.textContent = "Name must be at least 2 characters long.";
      return;
    }

    // 2. Validate Phone Format
    if (!PHONE_REGEX.test(phone)) {
      phoneInput.classList.add("invalid");
      phoneError.textContent = "Enter a valid Ethiopian phone (e.g. 0912345678 or +251912345678).";
      return;
    }

    // 3. Duplicate Prevention Check
    const existingSignups = loadSignups();
    const normalizedNewPhone = normalizePhone(phone);

    const isAlreadyRegistered = existingSignups.some((entry) => {
      return normalizePhone(entry.phone) === normalizedNewPhone;
    });

    if (isAlreadyRegistered) {
      phoneInput.classList.add("invalid");
      phoneError.textContent = "This phone number is already registered.";
      return;
    }

    // 4. Save Valid Entry
    existingSignups.push({ name, phone, timestamp: new Date().toISOString() });
    saveSignups(existingSignups);

    form.reset();
    renderStats();
  });

  // Initial render on page load
  renderStats();
});