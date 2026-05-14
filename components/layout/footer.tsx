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
      className="relative overflow-hidden border-t border-[var(--color-cta-from)] bg-[var(--color-primary)]"
    >
      <Image
        src="/img/GaginiSlatkisi-footer-img.png"
        alt=""
        width={420}
        height={420}
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6rem] -top-[3rem] hidden h-[36rem] w-auto -rotate-[12deg] select-none opacity-90 lg:block"
      />

      <div className="mx-auto grid max-w-[120rem] gap-[6.4rem] px-[3.2rem] py-[9.6rem] md:grid-cols-3 lg:gap-[4.8rem]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <Link href="/" aria-label="Naslovna" className="mb-[2.4rem]">
            <Image
              src="/img/GaginiSlatkiši.png"
              alt="GaginiSlatkiši logo"
              width={240}
              height={80}
              className="h-[8rem] w-auto"
            />
          </Link>

          <ul className="mb-[2.4rem] flex list-none gap-[2.4rem]">
            <li>
              <a
                href="https://instagram.com/gaginislatkisi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-[4.8rem] w-[4.8rem] place-items-center rounded-full bg-white text-[var(--color-accent)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 hover:bg-[var(--color-accent)] hover:text-white"
              >
                <InstagramIcon className="h-[2.6rem] w-[2.6rem]" />
              </a>
            </li>
            <li>
              <a
                href="https://m.facebook.com/Gagini-slatkisi-101539355408806/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-[4.8rem] w-[4.8rem] place-items-center rounded-full bg-white text-[var(--color-accent)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 hover:bg-[var(--color-accent)] hover:text-white"
              >
                <FacebookIcon className="h-[2.6rem] w-[2.6rem]" />
              </a>
            </li>
          </ul>

          <p className="text-[1.4rem] leading-[1.6] text-[var(--color-footer-text)]">
            Domaći kolači i torte<br />iz Lazarevca
          </p>
        </div>

        <div>
          <p className="mb-[2.4rem] text-[1.8rem] font-semibold text-[var(--color-text-dark)]">
            Kontaktirajte nas
          </p>
          <address className="space-y-[1.6rem] not-italic text-[1.6rem] leading-[1.6]">
            <p className="font-medium text-[var(--color-text-dark)]">
              Gagini Slatkiši, {city}
            </p>
            <p>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-[0.8rem] text-[var(--color-text-default)] transition-colors hover:text-[var(--color-accent)]"
              >
                <span aria-hidden="true">☎</span>
                {phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-[0.8rem] text-[var(--color-text-default)] transition-colors hover:text-[var(--color-accent)]"
              >
                <span aria-hidden="true">✉</span>
                {email}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Slatkiši">
          <p className="mb-[2.4rem] text-[1.8rem] font-semibold text-[var(--color-text-dark)]">
            Naši slatkiši
          </p>
          <ul className="grid grid-cols-2 gap-x-[2.4rem] gap-y-[1.2rem] text-[1.5rem] md:grid-cols-1 md:gap-y-[1.4rem]">
            {categories.map((c) => (
              <li key={c._id}>
                <Link
                  href={`/${c.slug}`}
                  className="text-[var(--color-text-default)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative border-t border-[var(--color-cta-from)]/40 bg-[var(--color-primary)]">
        <div className="mx-auto flex max-w-[120rem] flex-col items-center justify-between gap-[1.2rem] px-[3.2rem] py-[2.4rem] text-[1.3rem] text-[var(--color-footer-text)] md:flex-row">
          <p>Copyright © {new Date().getFullYear()} GaginiSlatkiši. Sva prava zadržana.</p>
          <p>
            Domaća poslastičarnica iz <span className="font-medium">{city}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
