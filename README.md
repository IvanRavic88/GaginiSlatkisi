# GaginiSlatkiši

Sajt poslastičarnice GaginiSlatkiši, Lazarevac. Next.js 16 + Sanity CMS + Tailwind CSS 4.

> Migracija sa Flask + SQLite + EC2 verzije u toku. Stari Flask kod ostaje na `main` granci do konačnog cutover-a.

## Tehnologije

- **Framework:** Next.js 16 (App Router, RSC)
- **Jezik:** TypeScript 5 (strict)
- **Styling:** Tailwind CSS 4 (CSS-first config)
- **CMS:** Sanity Studio v5 (embedovan na `/studio`)
- **Email:** Resend (verifikovan domen + Server Action + React Email template)
- **Bot zaštita:** Cloudflare Turnstile (managed widget + server-side siteverify)
- **Validacija:** Zod (deljena shema klijent + server)
- **Testovi:** Vitest (unit), Playwright (E2E)
- **Hosting:** Vercel (dodaje se u Planu D)

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

## Lighthouse rezultati (lokalni produkcijski build, 2026-05-18)

| Stranica         | Performance | Accessibility | Best Practices | SEO |
| ---------------- | ----------- | ------------- | -------------- | --- |
| Home `/` Desktop | 95          | 96            | 100            | 100 |
| Home `/` Mobile  | 79          | 96            | 100            | 100 |

Mereno preko `npx lighthouse` (headless Chrome) nakon Faza 6 redizajna. Skorovi reflektuju home stranicu sa svim sekcijama (Hero sa Caveat akcent rečju, 9 SlatkisiGrid kartica iz Sanity-ja, 27 galerija slika iz Sanity-ja, Pricing sa 2 kartice + 4 feature, CTA forma sa floating labels + WhatsApp link, Footer).

## Kontakt forma — setup

Forma na home stranici (`/#kontakt`) šalje email preko **Resend**-a sa **Cloudflare Turnstile** bot zaštitom. Zahteva 5 env varijabli u `.env.local` (pogledaj `.env.local.example`).

### 1. Resend

1. Registruj se na https://resend.com.
2. **Domains → Add Domain** → `gaginislatkisi.com`. Dodaj DNS zapise (SPF/DKIM TXT + bounce MX) na svojoj DNS zoni. Sačekaj status **Verified**.
3. **API Keys → Create** → permission **Sending access** → kopiraj `re_…` ključ.

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=kontakt@gaginislatkisi.com
RESEND_TO_EMAIL=gaginislatkisi@gmail.com
```

`RESEND_FROM_EMAIL` mora biti na verifikovanom domenu. Free tier: 100 email-ova/dan, 3000/mesec.

### 2. Cloudflare Turnstile

1. https://dash.cloudflare.com → **Turnstile** → **Add site**.
2. Hostnames: `gaginislatkisi.com`, `localhost`, `127.0.0.1`.
3. Widget Mode: **Managed**. Save.
4. Kopiraj **Site Key** i **Secret Key**.

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAA...
TURNSTILE_SECRET_KEY=0x4AAA...
```

`NEXT_PUBLIC_` prefiks je obavezan — site key ide u browser bundle.

### Flow

```
client ContactForm  ──▶  Server Action sendContact
   (Zod preview)         1. honeypot check
                         2. Zod validate
                         3. siteverify (Cloudflare)
                         4. resend.emails.send(React template)
                         5. { ok, error?, fieldErrors? }
```

Honeypot polje `last_name` (display:none + aria-hidden + tabindex=-1) — ako bot popuni, server vraća tihi success bez slanja.

## Live

Stara Flask verzija: https://www.gaginislatkisi.com/
