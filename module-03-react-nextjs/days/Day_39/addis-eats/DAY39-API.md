# Day 39 API

## GET /api/dishes

Returns the Addis Eats dish list from `src/lib/dishes.js` as JSON with HTTP `200`.

## GET /api/dishes/[id]

Finds one dish by its dynamic ID and returns it as JSON. Unknown IDs return HTTP `404` with the standard shape:

```json
{ "error": "Dish not found" }
```

## POST /api/orders

Reads JSON, validates it with the shared `orderSchema`, and stores a valid order in `data/orders.json`.

Invalid data returns HTTP `422`, not `200` or `500`:

```json
{
  "fieldErrors": {
    "customerName": ["Customer name is required"]
  }
}
```

`fieldErrors` is the object produced by Zod for each invalid field. A valid order returns HTTP `201` with the saved order.

## placeOrder

Checkout first had the information needed to submit to `POST /api/orders`. After that API version was verified, checkout was rewritten to use the `placeOrder` Server Action. The final checkout form no longer calls `fetch` for orders; it submits directly with the form action.

`placeOrder` receives `FormData`, parses the cart items, validates them with the same shared schema, stores the order, and returns either `{ success: false, fieldErrors }` or `{ success: true, order }`.

## useActionState

`CheckoutForm` uses React's `useActionState(placeOrder, initialState)`. The returned state displays server validation messages, while the `pending` value disables the submit button and changes its label to `Placing order...`.

## revalidatePath

After creating an order, `placeOrder` calls `revalidatePath("/orders")` so the orders page refreshes its cached data. `cancelOrder` calls the same path after changing an order status.

## cancelOrder

`cancelOrder` is a Server Action and performs authorization on the server in this order:

1. It checks the HttpOnly session cookie with `getSession`.
2. It looks up the order in the server-side store.
3. It compares `order.userId` with `session.user.id`.
4. It returns `Unauthorized` or `Forbidden` when the check fails.
5. Only after authorization succeeds does it write `status: "cancelled"`.
6. It revalidates `/orders` after the write.

The client never supplies an owner ID, and localStorage or hidden form fields are not trusted for authorization. This Day 39 project did not contain an existing Next.js authentication system, so it uses a minimal HttpOnly cookie session for the local exercise. Checkout creates the local demo session server-side; cancellation only accepts an already-present session.

## Verification

The production build passed. Manual HTTP checks passed for:

- `GET /api/dishes` -> `200`
- `GET /api/dishes/doro-wot` -> `200`
- `GET /api/dishes/does-not-exist` -> `404`
- Invalid `POST /api/orders` -> `422` with `fieldErrors`
- Valid `POST /api/orders` -> `201`
