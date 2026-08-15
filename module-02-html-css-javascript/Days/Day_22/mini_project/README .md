# Birr Watch 🇪🇹

Birr Watch is a responsive, single-page exchange rate application built for Ethiopian Birr (ETB). It retrieves live market rates from an open API, converts ETB amounts into global target currencies, and manages a watchlist persisted across browser sessions using `localStorage`.

## Features
- **Live ETB Rates:** Fetches exchange rates dynamically from `https://open.er-api.com/v6/latest/ETB`.
- **Status Indicator:** Renders real-time feedback for `loading`, `success`, and `error` network states.
- **Strict Input Validation:** Rejects empty, zero, negative, or non-numeric entries with inline alerts.
- **Watchlist Management:** Adds currencies to a tracked list (preventing duplicates) with single-click removal.
- **State Persistence:** Automatically saves your watchlist and last selected currency to `localStorage`.
- **Pure State Architecture:** All UI changes are driven directly by state modifications and a single `render()` function.

## API Used
- **Open Exchange Rates API (Free Tier):** `https://open.er-api.com/v6/latest/ETB`

