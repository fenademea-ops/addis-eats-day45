# Rendering Strategy

| Route | Strategy | Reason |
|------|----------|-------|
| `/` | Static | No request-specific data |
| `/menu` | ISR | Menu can be refreshed hourly |
| `/menu/[id]` | Static | Dish IDs are known and generated at build time |
| `/cart` | Client | Cart belongs to browser local storage |
| `/checkout` | Dynamic | Checkout represents request-specific order submission |
| `/api/dishes` | Request | Route Handler returns the current dish JSON |
| `/api/dishes/[id]` | Request | Route Handler looks up one dynamic ID |
| `/api/orders` | Request | Route Handler validates and creates a submitted order |

## Why These Strategies

- **Menu ISR:** `revalidate = 3600` lets Next.js reuse the server-rendered menu and refresh it no more than hourly. The page reads `menu-data.json` directly through `lib/dishes.js`; it does not call its own API.
- **Cart client state:** Cart contents are specific to the browser and persist in local storage. Quantity controls and totals therefore need the cart context.
- **Checkout dynamic rendering:** `dynamic = "force-dynamic"` makes checkout request-rendered. Order mutation and validation run in the Server Action, not in the browser.
- **Server Components by default:** Static content, catalog access, and dish markup remain on the server, reducing client JavaScript and keeping catalog logic out of the browser.
- **Small Client Component leaves:** Only browser state, event handlers, action status, category URL state, and the Next.js error boundary need client code. Server-rendered dish lists are passed into the category selector rather than rebuilt inside it.
- **Order persistence:** Orders use a process-memory store solely for this assignment. They are lost on server restart and are not shared between server instances.
