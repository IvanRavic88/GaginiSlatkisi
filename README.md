# GaginiSlatkisi

Modern website for **GaginiSlatkisi**, a cake shop in Lazarevac, built with **Next.js 16**, **Sanity CMS**, and **Tailwind CSS 4**.

> Migrated from the previous Flask + SQLite application.

## Tech Stack

* **Framework:** Next.js 16 (App Router, React Server Components)
* **Language:** TypeScript 5 (strict mode)
* **Styling:** Tailwind CSS 4
* **CMS:** Sanity Studio v5 (`/studio`)
* **Email:** Resend + React Email
* **Bot Protection:** Cloudflare Turnstile
* **Validation:** Zod
* **Testing:** Vitest + Playwright
* **Deployment:** Vercel

## Getting Started

### Prerequisites

* Node.js 22+
* A Sanity.io project

### Installation

```bash
git clone https://github.com/IvanRavic88/GaginiSlatkisi.git
cd GaginiSlatkisi
git checkout nextjs-migration

npm install

cp .env.local.example .env.local
# Configure your environment variables

# Run once if migrating from the legacy SQLite database
npm run migrate

npm run dev
```

Open:

* **Website:** http://localhost:3000
* **Sanity Studio:** http://localhost:3000/studio

## Available Scripts

| Command                  | Description                                   |
| ------------------------ | --------------------------------------------- |
| `npm run dev`            | Start the development server                  |
| `npm run build`          | Build for production                          |
| `npm run start`          | Start the production server                   |
| `npm run lint`           | Run ESLint                                    |
| `npm run format`         | Format the project with Prettier              |
| `npm run typecheck`      | Run TypeScript type checking                  |
| `npm run sanity:typegen` | Generate TypeScript types from Sanity schemas |
| `npm test`               | Run Vitest unit tests                         |
| `npm run test:e2e`       | Run Playwright end-to-end tests               |
| `npm run migrate`        | Migrate data from SQLite to Sanity            |

## Project Structure

```text
app/            # Next.js App Router
lib/sanity/     # Sanity client and GROQ queries
sanity/         # Studio configuration and schemas
scripts/        # Migration scripts
tests/e2e/      # Playwright tests
```

## Lighthouse

| Page           | Performance | Accessibility | Best Practices | SEO |
| -------------- | ----------: | ------------: | -------------: | --: |
| Home (Desktop) |          95 |            96 |            100 | 100 |
| Home (Mobile)  |          79 |            96 |            100 | 100 |

Measured locally using `npx lighthouse` on a production build.
