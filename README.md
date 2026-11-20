# WellGen Health website

The new wellgen-health.com, built with Astro and Tailwind CSS. The WordPress site stays live and untouched until launch.

## Run it on your computer

Needs Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:4321. Pages reload as you save.

To check the production build:

```bash
npm run build
npm run preview
```

## Add the real logo

Save the logo from the WordPress media library (`wp-content/uploads/2024/12/wellgen-logo.png`) as:

```
public/images/wellgen-logo.png
```

Restart `npm run dev`. The header and footer switch from the text logo to the image automatically.

## Where things live

| What | File |
| --- | --- |
| Brand colors and font | `src/styles/global.css` |
| Phone, email, locations, footer links | `src/data/site.ts` |
| Services menu: categories, services, URLs, old WordPress URLs | `src/data/services.ts` |
| Header, Services mega menu, mobile menu | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| Page wrapper, SEO tags | `src/layouts/BaseLayout.astro` |
| 404 page | `src/pages/404.astro` |
| Service pages (placeholders until phase 2) | `src/pages/services/` |

Adding a service: add one line to `src/data/services.ts`. The menu, mobile menu and pages update together.

## Search engines

Every page carries `noindex` until launch. On the live site, set the environment variable `PUBLIC_ALLOW_INDEXING=true`.

## Phase 1 status

- [x] Project setup
- [x] Brand colors and font (Rubik)
- [x] Header with three-level Services menu
- [x] Mobile menu
- [x] Footer
- [x] 404 page
- [ ] Real logo file (see above)
- [ ] Social profile links in `src/data/site.ts`
