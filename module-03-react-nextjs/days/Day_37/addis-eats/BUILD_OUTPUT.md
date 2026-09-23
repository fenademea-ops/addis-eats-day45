# Build Output

Command: `npm run build`

Next.js 16.3.6 production build completed successfully.

```text
Route (app)            Revalidate  Expire
○ /                    Static
○ /_not-found          Static
○ /cart                Static
ƒ /checkout            Dynamic
○ /menu                1m         1y
└ /menu/[id]           SSG
  ├ /menu/doro-wot
  ├ /menu/misir-wot
  ├ /menu/kitfo
  └ /menu/shiro

Static: prerendered as static content
SSG: prerendered as static HTML using generateStaticParams
Dynamic: server-rendered on demand
```
