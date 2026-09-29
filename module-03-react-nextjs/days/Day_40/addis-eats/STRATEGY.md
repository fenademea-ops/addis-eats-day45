# Rendering Strategy

| Route | Strategy | Reason |
|------|----------|-------|
| `/` | Static | No request-specific data |
| `/menu` | ISR | Menu can be refreshed hourly |
| `/menu/[id]` | Static | Dish IDs are known and generated at build time |
| `/cart` | Client | Cart is browser state and local storage |
| `/checkout` | Dynamic | Request-specific order submission |
| `/admin` | Dynamic | Protected admin dashboard and request-specific data |
| `/admin/dishes` | Dynamic | Admin dish list and mutations are request-specific |
| `/admin/orders` | Dynamic | Admin order updates are request-specific |
| `/admin/login` | Dynamic | Login checks the signed admin session and redirects authenticated users |
| `/api/dishes` | Request | Route Handler returns the current dish JSON |
| `/api/dishes/[id]` | Request | Route Handler resolves one dynamic dish |
| `/api/orders` | Request | Route Handler validates and creates a submitted order |

## Why These Strategies

- **Menu ISR:** `revalidate = 3600` lets the menu page be server-rendered and refreshed hourly.
- **Static dish pages:** `generateStaticParams()` pre-renders known menu items like `kitfo` and `doro-wat` at build time.
- **Client cart state:** The cart stays in local storage and is managed by a browser context; this is the best fit for quantity updates and total calculation.
- **Checkout dynamic rendering:** `dynamic = "force-dynamic"` handles form submissions and server-side validation on each request.
- **Admin authentication:** The customer navbar links to `/admin/login`. A Server Action validates the email and password with Zod, then creates an expiring, HMAC-signed HTTP-only cookie, marked Secure for HTTPS requests. The cookie is verified on the server for each protected route and admin mutation. Successful login redirects to `/admin`; logout clears the cookie and redirects to login.
- **Protected admin pages:** `/admin`, `/admin/dishes`, and `/admin/orders` redirect to `/admin/login` unless the signed session is valid. The login route redirects already-authenticated admins to `/admin`.
- **Demo limitation:** Default credentials are documented in `README.md` for coursework. This mechanism is educational only; production requires a managed identity system, secret rotation, and persistent/shared session secret configuration.
- **API routes:** Route Handlers are request-driven and let API clients fetch or post JSON without depending on the browser app state.
- **Order persistence:** For this educational project, data is stored in memory and is intentionally simple rather than using a database.
- **Authorization limitation:** Demo credentials and the local signing key are for coursework only. Production must configure private credentials and a stable, high-entropy `ADMIN_SESSION_SECRET` and use a managed identity/session system.
