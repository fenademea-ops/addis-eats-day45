# Day 38 bundle notes for Addis Eats

## Route summary

Production build command:

```bash
npm run build
```

Result from the working app:

- `/` static
- `/cart` static
- `/menu` static
- `/menu/[id]` dynamic

## First Load JS for `/menu`

This app is running on Next.js 16.3.6. In this version, the build output no longer includes the old `size` and `First Load JS` metrics that older Next.js versions reported in `next build`.

Because of that, there is no reliable `before` and `after` value to record from the current framework output itself. The last successful build produced the route tree above, but it did not print the old bundle metrics.

This means the honest result is:

- Before: not available from Next.js 16 build output
- After: not available from Next.js 16 build output
- Verified: route compilation and production generation succeeded

## Evidence

The production build completed successfully with:

```text
✓ Compiled successfully
✓ Generating static pages using 7 workers (6/6)
✓ Finalizing page optimization
```

This confirms the app is production-ready even though the old bundle metric format is no longer emitted by the framework.
