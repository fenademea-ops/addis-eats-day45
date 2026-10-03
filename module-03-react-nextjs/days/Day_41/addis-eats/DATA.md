# SWR data queries

The client-side SWR hooks use the shared fetcher in `src/lib/fetcher.ts`.

| Query key | Refresh and revalidation rule | Why it is used |
| --- | --- | --- |
| `/api/orders/${id}` | Revalidates every 5 seconds (`refreshInterval: 5000`) and uses SWR's default focus/reconnect revalidation. The server-rendered order is supplied as `fallbackData`, so the first paint does not wait for the client request. | Keeps an order's status current while avoiding an empty or loading first render. |
| `/api/dishes?search=${encodeURIComponent(search)}` (or `null` when the debounced, trimmed search is empty) | No polling; SWR's default revalidation applies when this key becomes active and on focus/reconnect. `keepPreviousData: true` retains results while a different search is loading. | Fetches search results only after the debounced search has text and avoids a request for an empty search. |
| `/api/dishes?page=${page}` | The page number comes from the server page's `searchParams`; changing pages updates the URL and therefore the key. No polling; SWR's default revalidation applies on mount/key changes and focus/reconnect. `keepPreviousData: true` keeps the previous page visible while the next page loads. | Gives each URL page its own cached result and keeps pagination shareable and navigable without `useSearchParams`. |
