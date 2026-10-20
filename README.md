# Toos Kitchen × Zaffran — Website

Bilingual (English default + full Arabic RTL) restaurant website for
Toos Kitchen (مطبخ طوس) and Zaffran (زعفران), Saihat, Saudi Arabia.
Angular 22 · standalone components · SCSS · signals.

## Run it

```bash
cd toos-kitchen-site
npm install
npx ng serve        # dev server → http://localhost:4200
npx ng build        # production build → dist/
```

Deploy the `dist/toos-kitchen-site/browser/` folder contents on Vercel
(or `npx vercel` inside the project).

## What's inside

- `src/app/i18n/en.json` + `ar.json` — every UI string in both languages
- `src/app/data/menu-data.ts` — full menu: 170 Toos dishes (24 categories)
  + 194 Zaffran dishes (17 categories), Arabic + English names, prices
- `src/app/data/site-data.ts` — phones, WhatsApp links, reviews, highlights
- `src/app/components/` — navbar, hero, highlights, menu-section, about,
  gallery, reviews, visit, footer, whatsapp-float, icon
- `src/assets/img/` — 13 curated photos (hero hoardings, dishes, interior)

## Before going live — MUST DO

1. Read `PRICES-TO-VERIFY.md` — only 2 prices are client-confirmed.
   Confirm every other price with the restaurant and update `menu-data.ts`.
2. Verify the call numbers 013 8083337 / 013 8566623 (from a hoarding photo).
3. Ask the client for real team/cook photos if they want them in About.

## Notes

- Default language is English (LTR). The navbar toggle switches the whole
  site to Arabic (RTL); choice is remembered in localStorage.
- Photos are customer-uploaded Google Maps photos (client approved their use).
- No backend, no database — WhatsApp ordering via wa.me links.
