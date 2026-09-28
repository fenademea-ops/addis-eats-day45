# Server / Client Boundary

| Component | Client? | Reason |
|-----------|---------|--------|
| `app/layout.js` | No | Shared shell, metadata, and navigation are server-rendered. |
| `app/page.js` | No | Static featured dishes; no browser state. |
| `app/menu/page.js` | No | Reads catalog data on the server and renders ISR output. |
| `app/menu/layout.js` | No | Persistent menu shell and category sidebar. |
| `app/menu/[id]/page.js` | No | Looks up known dish data and renders the detail page. |
| `components/DishList.jsx` | No | Maps server-provided dishes to cards. |
| `components/DishCard.jsx` | No | Server markup and links, with only its add button interactive. |
| `components/CategoryBar.jsx` | Yes | Reads URL search parameters to mark the selected category. |
| `components/FilterShell.jsx` | Yes | Selects among server-rendered dish-list slots using the current URL. |
| `components/AddToCartButton.jsx` | Yes | Handles clicks, cart context updates, and added feedback. |
| `components/Providers.jsx` | Yes | Provides browser cart state to interactive descendants. |
| `lib/cart-store.js` | Yes | Uses React context, state, effects, and local storage. |
| `components/CartClient.jsx` | Yes | Changes quantities, removes items, and displays browser cart totals. |
| `app/checkout/page.js` | No | Dynamic server page that hosts the checkout form. |
| `components/CheckoutForm.jsx` | Yes | Uses cart state, `useActionState`, and pending/validation/success UI. |
| `components/CancelOrderButton.jsx` | Yes | Shows the Server Action's pending, success, and authorization result. |
| `app/menu/error.js` | Yes | Next.js error boundaries must be Client Components and call `reset()`. |

The root layout stays a Server Component and passes rendered page content through the cart provider. We avoid making the entire application a Client Component so server data access, page composition, and dish markup remain server-side.
