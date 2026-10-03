# Addis Eats authentication

## Session cookie and `getSession()`

Signing in checks the supplied email and password against server-side account
records. Passwords are stored as scrypt hashes with unique salts; the demo
passwords below are only available when `NODE_ENV` is not `production`.

On success, the server issues the `addis-eats-session` cookie. It contains
signed session claims, not a password: a random session ID, the account ID,
and an expiry. The HMAC signature is verified with
`AUTH_SESSION_SECRET`. The cookie is `httpOnly`, `sameSite: "lax"`, scoped to
`/`, expires after seven days, and is `secure` in production.

`src/lib/session.ts` exports the reusable async `getSession()` helper. It
reads the cookie using `cookies()` and verifies its signature and expiry,
then loads the account from the trusted server-side account list. It returns
the trusted user ID and role, or `null` for missing/invalid sessions. Server
pages, server actions, and route handlers call this helper before protected
work. Sign-out deletes the browser's session cookie. Because sessions are
signed and stateless in this scaffold, a previously copied token remains
valid until its expiry; use a shared persistent session store/revocation list
if immediate revocation across devices or server instances is required.

## Accounts and configuration

The development-only accounts are:

| Role | Email | Password |
| --- | --- | --- |
| Customer A | `a@addiseats.local` | `AddisA!2026` |
| Customer B | `b@addiseats.local` | `AddisB!2026` |
| Staff | `staff@addiseats.local` | `Kitchen!2026` |

They are separate demo accounts for exercising ownership and role checks,
not an account database. Production disables these defaults and requires:

- `AUTH_SESSION_SECRET`: at least 32 bytes of high-entropy secret material.
- `AUTH_USERS_JSON`: a JSON array of account records with unique `id` and
  `email`, `name`, `role` (`customer` or `staff`), and `passwordSalt` and
  `passwordHash` fields. Salts and hashes use base64url; hashes are 64-byte
  scrypt outputs. Never store plain-text production passwords here.

Generate a salt and scrypt hash with Node's built-in crypto module, then
provision the resulting records through your deployment's secret manager.
The demo order store is also in-memory and resets when the server process
restarts; use a persistent database before production.

## Protected routes and middleware

`middleware.js` matches only `/checkout/:path*` and `/orders/:path*`. If the
session cookie is absent, it redirects to `/signin?next=...`. The narrow
matcher avoids executing middleware for public pages and static assets.
Middleware's cookie-presence check is an early navigation gate only; cookie
presence does **not** prove a valid session or role.

The server repeats the actual authorization:

- `/checkout`, `/orders`, and `/orders/[id]` call `getSession()` and redirect
  unauthenticated requests.
- `/kitchen` calls `getSession()` and returns not-found for non-staff users.
- Order server actions and `/api/orders/[id]` independently require a valid
  session. This protects direct action/API calls that do not rely on page
  navigation.
- The cancel action/API looks up the order by both its ID and the user ID
  from `getSession()` before changing its status. User A therefore cannot
  cancel User B's order by changing a form value or URL.
- Kitchen status updates verify `role === "staff"` on the server before
  changing an order. Hiding a Kitchen link is not an authorization check.

## Safe `next` redirects

The sign-in page and sign-in server action both pass `next` through
`getSafeNext()` in `src/lib/redirects.ts`. Only a same-origin path beginning
with one `/` is accepted. Protocol-relative paths (`//...`), backslashes,
control characters, absolute external URLs, and malformed values fall back
to `/`. After successful sign-in, the action redirects to this validated
path; it never redirects directly to browser-supplied text.

For example, `/signin?next=https://example.com` renders the sign-in page with
`/` as the validated destination. Submitting the form cannot redirect to
`example.com`, even if the hidden field is edited, because the server action
validates it again.

## Verification

With `npm run dev`, test:

1. Visit `/checkout` and `/orders` signed out; each redirects to sign-in.
2. Visit `/orders`, sign in as Customer A, and confirm the redirect returns
   to `/orders`.
3. Submit the sign-in form at `/signin?next=https://example.com`; successful
   sign-in returns to `/`, never the external site.
4. Customer A sees only `order-a-1`; Customer B's `order-b-1` detail and API
   response return not-found when requested by Customer A.
5. Customer A cannot cancel Customer B's order: the server action/API checks
   ownership using the verified session's user ID.
6. A customer visiting `/kitchen` receives not-found; the staff demo account
   can access it and update order status.
7. Sign out, then revisit `/checkout` or `/orders`; the cookie is removed and
   sign-in is required again.

The demo uses process memory for orders and local-only sample accounts. It is
intended to demonstrate the authorization boundaries, not to replace a
persistent production identity or order database.
