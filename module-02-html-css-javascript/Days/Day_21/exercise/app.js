document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const form = document.getElementById("signup-form");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const errorArea = document.getElementById("error-area");
  const statsArea = document.getElementById("stats");
  const themeToggleBtn = document.getElementById("theme-toggle");

  // Ethiopian phone number regex (matches +251..., 251..., 09..., or 07...)
  const ETHIOPIAN_PHONE_REGEX = /^(?:\+251|251|0)?[79]\d{8}$/;
  const STORAGE_KEY = "signups";

  // ==========================================
  // 1. Theme Toggle with localStorage Persistence
  // ==========================================
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeButtonText(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save choice on change
    updateThemeButtonText(newTheme);
  });

  function updateThemeButtonText(theme) {
    themeToggleBtn.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  // ==========================================
  // 2. Safe save() and load() Helper Functions
  // ==========================================
  function load(key) {
    try {
      const rawData = localStorage.getItem(key);
      if (rawData === null) return [];
      const parsed = JSON.parse(rawData);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn(`Error reading key "${key}" from localStorage:`, error);
      return []; // Fallback on corrupt data
    }
  }

  function save(key, arrayData) {
    try {
      localStorage.setItem(key, JSON.stringify(arrayData));
    } catch (error) {
      console.error(`Error writing key "${key}" to localStorage:`, error);
    }
  }

  // ==========================================
  // Ex 6: Restore & display total count on load
  // ==========================================
  function updateSignupStats() {
    const signups = load(STORAGE_KEY);
    statsArea.textContent = `Total registered signups: ${signups.length}`;
  }

  updateSignupStats(); // Show count on startup

  // Clear errors dynamically on input
  [nameInput, phoneInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("invalid");
      errorArea.textContent = "";
    });
  });

  // ==========================================
  // 4, 5 & 6. Form Submission, Validation & Saving
  // ==========================================
  form.addEventListener("submit", (event) => {
    // Ex 4: Prevent default submission
    event.preventDefault();

    // Reset previous errors
    errorArea.textContent = "";
    nameInput.classList.remove("invalid");
    phoneInput.classList.remove("invalid");

    // Ex 4: Read trimmed values
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // Ex 4 & 5: Validate Name (at least 2 characters)
    if (name.length < 2) {
      nameInput.classList.add("invalid");
      // Ex 5: Specific error for first problem found using textContent
      errorArea.textContent = "Please enter a name with at least 2 characters.";
      return;
    }

    // Ex 4 & 5: Validate Phone against Ethiopian regex
    if (!ETHIOPIAN_PHONE_REGEX.test(phone)) {
      phoneInput.classList.add("invalid");
      // Ex 5: Specific error for phone
      errorArea.textContent = "Please enter a valid Ethiopian phone number (e.g., +251912345678 or 0912345678).";
      return;
    }

    // Ex 6: On success, append entry & save array to localStorage as JSON
    const signups = load(STORAGE_KEY);
    signups.push({ name, phone, timestamp: new Date().toISOString() });
    save(STORAGE_KEY, signups);

    // Ex 6: Clear form & update total count
    form.reset();
    updateSignupStats();
  });
});