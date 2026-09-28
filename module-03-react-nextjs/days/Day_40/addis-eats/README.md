# Addis Eats

Addis Eats is a small Ethiopian food-ordering demo built with the Next.js App Router. Browse dishes, add them to a browser-side cart, and submit an order that is validated and processed on the server.

## Technologies

- Next.js 16 App Router
- React 19
- JavaScript
- Tailwind CSS
- Zod
- ESLint

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Production start

```bash
npm run start
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Static home page and today's featured dishes |
| `/menu` | Server-rendered menu with hourly ISR and category selection |
| `/menu/[id]` | Dish details, generated at build time for known IDs |
| `/cart` | Browser-side cart controls and totals |
| `/checkout` | Dynamic checkout form and order summary |
| `/api/dishes` | GET all dishes as JSON |
| `/api/dishes/[id]` | GET one dish, or 404 when it is missing |
| `/api/orders` | POST a validated order |

## Rendering Strategies

The home page is static because its content does not depend on a request. The menu exports `revalidate = 3600`, so Next.js can reuse its server-rendered page and refresh it hourly. Dish pages use `generateStaticParams()` for the IDs in the local catalog. The cart is interactive browser state persisted in local storage. Checkout exports `dynamic = "force-dynamic"` because order submission is request-specific. API Route Handlers process each request.

## Server and Client Components

Layouts, pages, dish data access, `DishList`, and `DishCard` stay on the server. Client Components are limited to the cart provider and controls, category selection, checkout form state, cancellation state, and the required menu error boundary. The root layout remains a Server Component and passes its page content through the cart provider as children.

## API

`GET /api/dishes` returns `{ "dishes": [...] }`. `GET /api/dishes/[id]` returns one dish or `{ "error": "Dish not found" }` with status 404. `POST /api/orders` accepts customer fields and `items` containing dish IDs and quantities. Invalid data returns status 422 with `fieldErrors`; malformed JSON returns status 400. Prices and names are looked up from the server-side menu rather than trusted from the request.

## Server Actions

`placeOrder` validates checkout data, creates the order, returns field or success state, and revalidates checkout. `cancelOrder` reads the current session cookie on the server, finds the requested order, and removes it only when its stored owner matches that session. The order reference is user-submitted, but ownership is never accepted from the browser.

## Validation and Security

`lib/schema.js` is shared by the Route Handler and Server Action. It checks customer name, Ethiopian phone number, delivery location, payment method, and item IDs/quantities. The server also checks that each dish still exists and derives its price from the menu data.

For this assignment, the server issues an HttpOnly, SameSite cookie with a random demo session ID. Orders store that ID as their owner, and cancellation compares it server-side. This demonstrates ownership checks but is not a production authentication system. Orders are stored in process memory and disappear when the server restarts; multiple server instances do not share that memory. A real deployment needs authenticated sessions and a persistent database.

The Server Action can handle a form submission before its client JavaScript hydrates. Restoring a cart from local storage itself requires browser JavaScript, so a no-JavaScript checkout submission has no cart items and is rejected by server validation.

## Testing

```bash
npm run lint
npm run build
npm run start
```
