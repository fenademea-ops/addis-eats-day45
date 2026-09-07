# React Profiler Notes

I recorded a React DevTools Profiler session while adding dishes from `/menu`.

| Session | Slowest component | Commit duration |
| --- | --- | ---: |
| Before | `Menu` | 6.8 ms |
| After | `CartBadge` | 2.1 ms |

The slowest component before the fix was `Menu`, because every cart update recreated every dish card. The fix was moving each card into a memoized `DishCard`; the stable Zustand `addItem` selector is passed to it, so unchanged cards skip re-rendering.

The `menu` React Profiler also logs commit timings to the browser console. To confirm the menu boundary, open `/menu?crash-dish=3`: the menu fallback appears while the layout and cart boundary remain available.