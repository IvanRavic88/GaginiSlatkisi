import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/ui'
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

  return (
    <footer id="footer" className="mt-[9.6rem] bg-[var(--color-primary-tint)] py-[6.4rem]">
      <Container className="grid grid-cols-1 gap-[4.8rem] md:grid-cols-4">
        <div className="space-y-[1.6rem]">
          <Link href="/" aria-label="Naslovna">
            <Image
              src="/img/GaginiSlatkiši.png"
              alt=""
              width={140}
              height={50}
              className="h-auto w-[14rem]"
            />
          </Link>
          <p className="text-[1.4rem] text-[var(--color-text-muted)]">
            Copyright © {new Date().getFullYear()} GaginiSlatkiši
          </p>
        </div>

        <div>
          <h3 className="mb-[1.6rem] text-[1.8rem] font-semibold text-[var(--color-text-dark)]">
            Kontaktirajte nas
          </h3>
          <address className="space-y-[0.8rem] text-[1.6rem] not-italic text-[var(--color-text-default)]">
            <p>Gagini Slatkiši, {settings?.address?.city ?? 'Lazarevac'}</p>
            {settings?.phone ? (
              <p>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[var(--color-accent-dark)]"
                >
                  {settings.phone}
                </a>
              </p>
            ) : null}
            {settings?.contactEmail ? (
              <p>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-[var(--color-accent-dark)]"
                >
                  {settings.contactEmail}
                </a>
              </p>
            ) : null}
          </address>
        </div>

        <nav aria-label="Kategorije">
          <h3 className="mb-[1.6rem] text-[1.8rem] font-semibold text-[var(--color-text-dark)]">
            Slatkiši
          </h3>
          <ul className="space-y-[0.8rem] text-[1.6rem]">
            {categories.map((c) => (
              <li key={c._id}>
                <Link
                  href={`/${c.slug}`}
                  className="text-[var(--color-text-default)] hover:text-[var(--color-accent-dark)]"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Sajt">
          <h3 className="mb-[1.6rem] text-[1.8rem] font-semibold text-[var(--color-text-dark)]">
            Sajt
          </h3>
          <ul className="space-y-[0.8rem] text-[1.6rem]">
            <li>
              <Link href="/#kolaci" className="hover:text-[var(--color-accent-dark)]">
                Kolači i torte
              </Link>
            </li>
            <li>
              <Link href="/#galerija" className="hover:text-[var(--color-accent-dark)]">
                Galerija
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="hover:text-[var(--color-accent-dark)]">
                Cene
              </Link>
            </li>
            <li>
              <Link href="/#footer" className="hover:text-[var(--color-accent-dark)]">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  )
}
