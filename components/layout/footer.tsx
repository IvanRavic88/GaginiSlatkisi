import Image from 'next/image'
import Link from 'next/link'

import { FacebookIcon, InstagramIcon } from '@/components/ui/icons'
import { sanityFetch } from '@/lib/sanity/fetch'
import { ALL_CATEGORIES_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { ALL_CATEGORIES_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export async function Footer() {
  const [categories, settings] = await Promise.all([
    sanityFetch<ALL_CATEGORIES_QUERY_RESULT>({
      query: ALL_CATEGORIES_QUERY,
      tags: ['category'],
    }),
    sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
      query: SITE_SETTINGS_QUERY,
      tags: ['siteSettings'],
    }),
  ])

  const phone = settings?.phone ?? '065/5593-678'
  const email = settings?.contactEmail ?? 'gaginislatkisi@gmail.com'
  const city = settings?.address?.city ?? 'Lazarevac'

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-[var(--color-cta-from)] bg-[var(--color-primary)] py-[10.8rem]"
    >
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 gap-[6.4rem] px-[3.2rem] md:grid-cols-3">
        <div className="flex flex-col">
          <Link href="/" aria-label="Naslovna" className="mb-[3.2rem] self-center">
            <Image
              src="/img/GaginiSlatkiši.png"
              alt="GaginiSlatkiši logo"
              width={240}
              height={80}
              className="h-[8rem] w-auto"
            />
          </Link>

          <ul className="flex list-none justify-center gap-[3rem]">
            <li>
              <a
                href="https://instagram.com/gaginislatkisi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-dark)]"
              >
                <InstagramIcon className="h-[5rem] w-[5rem]" />
              </a>
            </li>
            <li>
              <a
                href="https://m.facebook.com/Gagini-slatkisi-101539355408806/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-dark)]"
              >
                <FacebookIcon className="h-[5rem] w-[5rem]" />
              </a>
            </li>
          </ul>

          <p className="mt-auto pt-[3.2rem] text-[1.4rem] leading-[1.6] text-[var(--color-footer-text)]">
            Copyright © {new Date().getFullYear()} by GaginiSlatkiši. All rights reserved.
          </p>
        </div>

        <div className="font-bold text-[var(--color-text-dark)]">
          <p className="mb-[4rem] text-[1.8rem] font-medium">Kontaktirajte nas:</p>
          <address className="not-italic text-[1.6rem] font-normal leading-[1.6]">
            <p className="mb-[2.4rem]">Gagini Slatkiši, {city}</p>
            <p>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="text-[var(--color-footer-text)] transition-colors hover:text-[var(--color-text-default)]"
              >
                {phone}
              </a>
              <br />
              <a
                href={`mailto:${email}`}
                className="text-[var(--color-footer-text)] transition-colors hover:text-[var(--color-text-default)]"
              >
                {email}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Kategorije">
          <p className="mb-[4rem] text-[1.8rem] font-medium text-[var(--color-text-dark)]">
            Slatkiši
          </p>
          <ul className="flex flex-col gap-[2.4rem] text-[1.6rem]">
            {categories.map((c) => (
              <li key={c._id}>
                <Link
                  href={`/${c.slug}`}
                  className="text-[var(--color-footer-text)] transition-colors hover:text-[var(--color-text-default)]"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Image
        src="/img/GaginiSlatkisi-footer-img.png"
        alt=""
        width={320}
        height={320}
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10rem] bottom-0 hidden h-[32rem] w-auto -rotate-[10deg] select-none md:block"
      />
    </footer>
  )
}
