# Build Output

Generated with `npm run build` after completing the Day 37 exercise.

Expected route strategy summary:

```text
○ /                 Static
○ /cart             Static
ƒ /checkout         Dynamic (force-dynamic)
○ /menu             ISR (revalidate: 60)
● /menu/[id]        Static, 4 generated pages
```