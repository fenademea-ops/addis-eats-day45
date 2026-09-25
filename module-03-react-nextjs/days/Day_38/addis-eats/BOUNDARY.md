# Addis Eats server/client boundary

This app is organized to keep server work on the server and interactive behavior in the leaf client components.

## Server components
- `src/app/layout.js` renders the shared shell and nav; it stays server-side because it has no browser-only state.
- `src/app/page.js` renders the landing page; it is static marketing content.
- `src/app/menu/page.js` is the menu route entry. It fetches the dish list on the server and passes it down to the client shell.
- `src/app/menu/DishList.js` renders the menu cards as a server component; it is purely presentational.
- `src/app/menu/[id]/page.js` reads the dish from the shared data module and renders the detail page on the server.

## Client components
- `src/app/providers.jsx` is the only client boundary around the cart context. This keeps browser-only state isolated at the app root.
- `src/context/CartContext.jsx` holds cart state and localStorage persistence, so it must remain a client component.
- `src/app/menu/CategoryBar.jsx` owns the interactive category filter; it uses a click state and therefore belongs on the client.
- `src/app/menu/FilterShell.jsx` is the client wrapper that contains the category bar and passes the server-rendered list as children.
- `src/app/menu/[id]/AddToCartButton.jsx` is a client button that calls `addToCart`, so it stays small and interactive.
- `src/app/cart/CartClient.jsx` is a client-only cart view because it reads cart state from context and browser storage.

## Why this pattern matters
The server still owns the page data and the initial render. The client boundary only starts where interactivity is needed, which keeps the menu route fast and avoids shipping unnecessary client logic to every page.
