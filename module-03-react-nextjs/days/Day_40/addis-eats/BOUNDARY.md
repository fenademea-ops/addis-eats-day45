# Server / Client Boundary

| Component | Client? | Reason |
|-----------|---------|--------|
| `app/layout.js` | No | Shared shell and metadata stay server-rendered. |
| `app/page.js` | No | The home page is static and does not need browser state. |
| `app/menu/page.js` | No | Reads dish data on the server and uses ISR. |
| `app/menu/layout.js` | No | Keeps the server-rendered menu shell and persistent navigation. |
| `app/menu/[id]/page.js` | No | Renders known dish details from server data. |
| `components/DishList.jsx` | No | Maps server-provided dishes to markup. |
| `components/DishCard.jsx` | No | Server-rendered card with a client add-to-cart button. |
| `components/CategoryBar.jsx` | Yes | Reads the current query string and makes category selection interactive. |
| `components/FilterShell.jsx` | Yes | Uses client-side URL state to filter the menu. |
| `components/AddToCartButton.jsx` | Yes | Adds items to the cart and updates UX state. |
| `components/Providers.jsx` | Yes | Supplies the browser cart context. |
| `lib/cart-store.js` | Yes | Uses local storage and client-side state. |
| `components/CartClient.jsx` | Yes | Updates quantities and totals in the browser. |
| `app/checkout/page.js` | No | Dynamic page that hosts the checkout form. |
| `components/CheckoutForm.jsx` | Yes | Uses cart state, action state, and pending/validation UI. |
| `components/CancelOrderButton.jsx` | Yes | Handles order-cancel action feedback. |
| `components/AdminDishForm.jsx` | Yes | Handles admin form interaction and action-state feedback. |
| `components/DeleteDishButton.jsx` | Yes | Confirms deletion before submitting the server action. |
| `components/AdminLoginForm.jsx` | Yes | Uses `useActionState` for pending/errors and local state only to toggle password visibility. |
| `app/admin/login/page.js` | No | Checks the session and redirects already-authenticated admins on the server. |
| `lib/admin-auth.js` | Server-only | Stores demo credentials on the server and signs/verifies expiring session cookies. |
| `app/actions.js` admin auth actions | Server-only | Validates login, sets/clears the HTTP-only cookie, marks it Secure for HTTPS requests, and checks sessions for protected mutations. |
| `app/menu/error.js` | Yes | Error boundaries need to be client-side and call `reset()`. |
| `app/admin/layout.js` | No | Server layout that composes the interactive admin shell. |
| `components/AdminShell.jsx` | Yes | Controls the drawer, page title, and logout form. |
| `components/AdminSidebar.jsx` | Yes | Uses the current route for active navigation and presents the responsive drawer. |
| `components/AdminDishTable.jsx` | No | Server-side dish table with server actions for edit/delete. |
| `components/AdminOrderTable.jsx` | No | Server-side order table using forms that submit server actions. |

The client boundary remains intentionally small. The app uses server components for menu rendering, admin summaries, and data access, while only browser features such as cart state, action progress, password visibility, and error reset need client JavaScript. The password is submitted to a Server Action and is never stored in browser storage or included in client configuration. Admin access is decided by the server-verified signed cookie, never by a client-side flag.
