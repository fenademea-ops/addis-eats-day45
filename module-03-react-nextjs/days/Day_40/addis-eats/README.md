# Addis Eats

## Features

- Customer ordering flow for Ethiopian and international dishes
- Browser-side cart with quantity controls and totals
- Dynamic checkout with validation and server-side order creation
- Admin dashboard for dishes and orders
- Dish management and order status updates with server-side checks
- Demo admin authorization and ownership enforcement

## Technologies

- Next.js
-
- JavaScript
- Tailwind CSS
- Zod

## Customer Routes

- `/`
- `/menu`
- `/menu/[id]`
- `/cart`
- `/checkout`

## Admin Routes

- `/admin/login`
- `/admin`
- `/admin/dishes`
- `/admin/orders`

### Admin Login

The customer navbar's Admin link opens `/admin/login`. The login Server Action validates credentials on the server and sets an expiring, HMAC-signed, HTTP-only cookie, marked Secure for HTTPS requests. `/admin`, `/admin/dishes`, `/admin/orders`, and admin mutations verify that session server-side. Logout clears the cookie and returns to the login page.

Demo credentials:

- Email: `admin@addiseats.com`
- Password: `Admin123!`

These credentials and the cookie session are for educational/demo purposes only. They are not production authentication. The local demo uses a stable development signing key so sessions work across Next.js server workers. For a deployed app, configure `ADMIN_LOGIN_EMAIL`, `ADMIN_LOGIN_PASSWORD`, and a stable random `ADMIN_SESSION_SECRET` on the server. The session expires after 12 hours by default or 30 days when Remember me is selected.

## API Routes

- `/api/dishes`
- `/api/dishes/[id]`
- `/api/orders`

## Rendering Strategies

- Static: Home page and other pages without request-specific data.
- ISR: `/menu` uses `revalidate = 3600` to refresh hourly.
- Dynamic: `/checkout` and admin pages render request-by-request.
- Client: cart state and browser-only interaction remain client-side.

## Server Components

The server keeps the root layout, home page, menu pages, dish details, admin dashboard summary, admin tables, and route handlers on the server. This keeps data access in a single place and makes the page structure easier to explain and maintain.

## Client Components

Client components are limited to browser-only features such as the cart provider, cart controls, add-to-cart button, checkout form, admin login form (password visibility and pending/error feedback), interactive admin shell/sidebar, admin add/edit form, and the required error boundary. Credentials are not placed in client JavaScript.

## Server Actions

The project uses server actions for:

- `placeOrder`
- `cancelOrder`
- `addDish`
- `updateDish`
- `deleteDish`
- `updateOrderStatus`
- `loginAdmin`
- `logoutAdmin`

These actions validate the request on the server and revalidate the affected pages after successful mutation.

## Validation

`lib/schema.js` holds the shared Zod validation for orders, dish input, order status, and admin login fields. The same schema is used by server actions and API handlers so the validation rules stay consistent across the app.

## Authorization

Admin access is protected by a signed session cookie named `addis-eats-admin-role`. The cookie is HTTP-only, same-site, Secure on HTTPS, expires after 12 hours by default (30 days with Remember me), and is checked by server components and every protected admin mutation. Logout clears it. Client-side flags do not grant authorization. This demo uses public coursework credentials and a stable local signing key; it is not production authentication. Configure a private `ADMIN_SESSION_SECRET` and real identity provider for production.

## Production Verification

```bash
npm run build
npm run start
```

This project has been checked in production mode to confirm the app builds successfully and the server starts without errors.
