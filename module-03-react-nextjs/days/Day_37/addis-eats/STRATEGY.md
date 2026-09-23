# Addis Eats Rendering Strategy

| Route | Strategy | Why |
| --- | --- | --- |
| `/` | Static | The homepage content is stable and can be cached. |
| `/menu` | ISR, `revalidate = 60` | The menu can update while remaining cache-friendly. |
| `/menu/[id]` | Static generation | `generateStaticParams` prebuilds all four known dishes. |
| `/cart` | Static | The starter cart shell has no request-specific data. |
| `/checkout` | Dynamic | The request header determines the delivery zone. |

The menu layout is persistent across menu navigation, so the category sidebar remains mounted while a dish page changes inside the segment.