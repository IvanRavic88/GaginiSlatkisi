# GaginiSlatkiši

Sajt poslastičarnice GaginiSlatkiši, Lazarevac. Next.js 16 + Sanity CMS + Tailwind CSS 4.

> Migracija sa Flask + SQLite + EC2 verzije u toku. Stari Flask kod ostaje na `main` granci do konačnog cutover-a.

## Tehnologije

- **Framework:** Next.js 16 (App Router, RSC)
- **Jezik:** TypeScript 5 (strict)
- **Styling:** Tailwind CSS 4 (CSS-first config)
- **CMS:** Sanity Studio v5 (embedovan na `/studio`)
- **Email:** Resend (dodaje se u Planu C)
- **Bot zaštita:** Cloudflare Turnstile (dodaje se u Planu C)
- **Testovi:** Vitest (unit), Playwright (E2E)
- **Hosting:** Vercel (dodaje se u Planu C)

## Lokalni razvoj

### Pre-rekviziti

- Node.js 22+ (zbog `node:sqlite` built-in modula koji koristi migracija)
- Nalog na Sanity.io sa kreiranim projektom

### Setup

```bash
# Kloniraj repo
git clone https://github.com/IvanRavic88/GaginiSlatkisi.git
cd GaginiSlatkisi
git checkout nextjs-migration

# Instaliraj deps
npm install

# Kopiraj env šablon i popuni vrednosti
cp .env.local.example .env.local
# Edituj .env.local sa Sanity Project ID, dataset, write token, itd.

# Migriraj postojeće slatkiše iz SQLite-a (jednom)
npm run migrate

# Pokreni dev server
npm run dev
```

Otvori:

- Sajt: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

### Skripte

- `npm run dev` — dev server
- `npm run build` — produkcijski build
- `npm run start` — produkcijski server (posle build-a)
- `npm test` — Vitest unit testovi
- `npm run test:e2e` — Playwright E2E testovi
- `npm run lint` — ESLint
- `npm run format` — Prettier auto-fix
- `npm run typecheck` — TypeScript provera
- `npm run sanity:typegen` — generiši TS tipove iz Sanity šema
- `npm run migrate` — jednokratna migracija iz SQLite u Sanity

## Struktura

```
app/              # Next.js App Router
sanity/           # Sanity šeme + Studio config
lib/sanity/       # Sanity klijenti + GROQ upiti
scripts/          # Migracioni skripti
tests/e2e/        # Playwright testovi
```

## Lighthouse rezultati (lokalni produkcijski build, 2026-05-12)

| Stranica          | Performance | Accessibility | Best Practices | SEO |
| ----------------- | ----------- | ------------- | -------------- | --- |
| Home `/` (Mobile) | 94          | 96            | 100            | 100 |

## Live

Stara Flask verzija: https://www.gaginislatkisi.com/
