import Image from 'next/image'
import Link from 'next/link'

import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ViberIcon,
} from '@/components/ui/icons'
import { sanityFetch } from '@/lib/sanity/fetch'
import { ALL_CATEGORIES_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { ALL_CATEGORIES_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

function ContactLine({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <>
      <span className="grid h-[4.4rem] w-[4.4rem] flex-none place-items-center rounded-full bg-white text-[var(--color-accent)] shadow-[0_2px_6px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:shadow-[0_4px_14px_rgba(246,80,160,0.35)]">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[1.2rem] font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
          {label}
        </span>
        <span className="text-[1.6rem] font-medium text-[var(--color-text-dark)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
          {value}
        </span>
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} className="group flex items-center gap-[1.4rem]">
        {inner}
      </a>
    )
  }
  return <div className="group flex items-center gap-[1.4rem]">{inner}</div>
}

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
  const viberNumber = phone.replace(/[^0-9]/g, '').replace(/^0/, '381')

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t-2 border-[var(--color-primary-shade)]/30 bg-[linear-gradient(to_bottom,var(--color-header-bg),var(--color-primary))]"
    >
      <Image
        src="/img/GaginiSlatkisi-footer-img.png"
        alt=""
        width={420}
        height={420}
        aria-hidden="true"
        className="animate-float-gentle pointer-events-none absolute top-[2rem] -right-[5rem] hidden h-[28rem] w-auto -rotate-[12deg] opacity-25 select-none lg:block"
      />

      <div className="relative mx-auto max-w-[120rem] px-[1.6rem] py-[4.8rem] sm:px-[2.4rem] md:px-[3.2rem] md:py-[6.4rem]">
        <div className="grid grid-cols-1 gap-[5.6rem] md:grid-cols-12 md:gap-[3.2rem]">
          {/* BRAND COL */}
          <div className="md:col-span-4">
            <Link href="/" aria-label="Naslovna" className="group inline-block">
              <Image
                src="/img/GaginiSlatkiši.png"
                alt="GaginiSlatkiši logo"
                width={240}
                height={80}
                className="h-[6.4rem] w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="mt-[1.6rem] max-w-[28rem] text-[1.5rem] leading-[1.6] text-[var(--color-text-default)]">
              Domaći kolači i torte, ručno spremljeni od pažljivo odabranih sastojaka.
            </p>

            <ul className="mt-[2.4rem] flex list-none gap-[1.2rem]">
              <li>
                <a
                  href="https://instagram.com/gaginislatkisi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group relative grid h-[4.4rem] w-[4.4rem] place-items-center overflow-hidden rounded-full bg-white text-[var(--color-accent)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[0.3rem] hover:shadow-[0_8px_20px_rgba(225,48,108,0.35)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <InstagramIcon className="relative h-[2.2rem] w-[2.2rem] transition-colors duration-300 group-hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href="https://m.facebook.com/Gagini-slatkisi-101539355408806/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group relative grid h-[4.4rem] w-[4.4rem] place-items-center overflow-hidden rounded-full bg-white text-[var(--color-accent)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[0.3rem] hover:shadow-[0_8px_20px_rgba(24,119,242,0.35)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#1877f2] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <FacebookIcon className="relative h-[2.2rem] w-[2.2rem] transition-colors duration-300 group-hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href={`viber://chat?number=%2B${viberNumber}`}
                  aria-label="Viber"
                  className="group relative grid h-[4.4rem] w-[4.4rem] place-items-center overflow-hidden rounded-full bg-white text-[var(--color-accent)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[0.3rem] hover:shadow-[0_8px_20px_rgba(115,96,242,0.4)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#7360f2] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <ViberIcon className="relative h-[2.6rem] w-[2.6rem] transition-colors duration-300 group-hover:text-white" />
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT COL */}
          <div className="md:col-span-4">
            <p className="mb-[2rem] text-[1.4rem] font-bold tracking-wide text-[var(--color-accent-text)] uppercase">
              Kontaktirajte nas
            </p>
            <ul className="space-y-[1.6rem]">
              <li>
                <ContactLine
                  icon={<PinIcon className="h-[2rem] w-[2rem]" />}
                  label="Adresa"
                  value={`Gagini Slatkiši, ${city}`}
                />
              </li>
              <li>
                <ContactLine
                  icon={<PhoneIcon className="h-[2rem] w-[2rem]" />}
                  label="Telefon"
                  value={phone}
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                />
              </li>
              <li>
                <ContactLine
                  icon={<MailIcon className="h-[2rem] w-[2rem]" />}
                  label="Email"
                  value={email}
                  href={`mailto:${email}`}
                />
              </li>
            </ul>
          </div>

          {/* CATEGORIES COL */}
          <nav aria-label="Slatkiši" className="md:col-span-4">
            <p className="mb-[2rem] text-[1.4rem] font-bold tracking-wide text-[var(--color-accent-text)] uppercase">
              Naši slatkiši
            </p>
            <ul className="grid grid-cols-2 gap-x-[2.4rem] gap-y-[1.1rem] text-[1.5rem]">
              {categories.map((c) => (
                <li key={c._id}>
                  <Link
                    href={`/${c.slug}`}
                    className="group relative inline-block text-[var(--color-text-default)] transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    <span>{c.name}</span>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[2px] left-0 h-[1px] w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="relative border-t border-[var(--color-primary-shade)]/20 bg-white/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[120rem] flex-col items-center justify-between gap-[0.8rem] px-[1.6rem] py-[2rem] text-[1.2rem] text-[var(--color-footer-text)] sm:px-[2.4rem] sm:text-[1.3rem] md:flex-row md:px-[3.2rem]">
          <p className="flex items-center gap-[1rem]">
            <span>© {new Date().getFullYear()} GaginiSlatkiši · Sva prava zadržana</span>
            <span aria-hidden="true" className="text-[var(--color-primary-shade)]/50">·</span>
            <Link
              href="/admin"
              aria-label="Admin prijava"
              className="inline-flex items-center gap-[0.4rem] text-[var(--color-footer-text)]/70 transition hover:text-[var(--color-accent)]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.3rem] w-[1.3rem]">
                <path
                  d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM6 13l-3 5 3 1.5L9 17l3 3 3-3 3 2.5 3-1.5-3-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span>admin</span>
            </Link>
          </p>
          <p>
            Domaća poslastičarnica iz{' '}
            <span className="font-medium text-[var(--color-accent-text)]">
              {city === 'Lazarevac' ? 'Lazarevca' : city}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
