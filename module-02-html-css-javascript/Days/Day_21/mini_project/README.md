# Mini-Project · Validated, Persistent Signup Form

A responsive signup form built with vanilla JavaScript that validates user input using regular expressions, prevents duplicate signups, and persists entries to `localStorage` as JSON.

## Features
- **Field Validation:**
  - Full Name: At least 2 characters required.
  - Ethiopian Phone: Validated against `/^(?:\+251|0)9\d{8}$/` (e.g., `0912345678` or `+251912345678`).
- **Inline Error Reporting:** Displays clear error messages directly beneath the specific input field using `.textContent`.
- **Duplicate Prevention:** Rejects submissions with phone numbers that are already registered.
- **Persistent Storage:** Saves registrations as JSON in `localStorage` and restores total signups count on reload (handles `null` and corrupted data safely with `try...catch`).
- **Theme Switcher:** Includes a Light/Dark theme toggle that remembers user preference.

