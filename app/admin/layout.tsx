import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { getSession } from '@/lib/admin/auth'
import { LogoutButton } from './components/logout-button'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  return (
    <div className="min-h-[100svh] bg-[var(--color-cream)]">
      {session && (
        <header className="sticky top-0 z-30 border-b border-[rgba(184,105,58,0.18)] bg-[#fffaf3]/95 backdrop-blur-md">
          {/* Brand ribbon */}
          <div
            aria-hidden="true"
            className="h-[0.4rem]"
            style={{
              background:
                'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary-shade) 45%, var(--color-ribbon-bg) 100%)',
            }}
          />
          <Container as="nav" className="flex items-center justify-between gap-[1.2rem] py-[1.2rem] sm:py-[1.6rem]">
            <Link
              href="/admin"
              className="group flex items-center gap-[1rem] sm:gap-[1.4rem]"
              aria-label="Admin home"
            >
              <Image
                src="/img/GaginiSlatkiši.webp"
                alt="GaginiSlatkiši"
                width={200}
                height={80}
                priority
                className="h-[4rem] w-auto transition-transform duration-300 group-hover:scale-105 sm:h-[5rem]"
              />
              <span className="font-[family-name:var(--font-caveat)] text-[2.4rem] leading-none text-[var(--color-accent)] sm:text-[3rem]">
                Admin
              </span>
            </Link>

            <div className="flex items-center gap-[0.8rem] sm:gap-[1.2rem]">
              <span
                className="hidden truncate max-w-[20rem] text-[1.35rem] text-[var(--color-caramel)]/80 lg:inline"
                title={session.email}
              >
                {session.email}
              </span>
              <Link
                href="/"
                aria-label="Otvori javni sajt"
                className="inline-flex h-[4.4rem] items-center justify-center gap-[0.6rem] rounded-full border-2 border-[rgba(184,105,58,0.25)] bg-white px-[1.2rem] text-[1.35rem] font-semibold text-[var(--color-caramel)] transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-primary)]/40 hover:text-[var(--color-accent-text)] sm:px-[1.6rem]"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.6rem] w-[1.6rem]">
                  <path
                    d="M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h4v-7h4v7h4a1 1 0 0 0 1-1V10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="hidden sm:inline">Sajt</span>
              </Link>
              <LogoutButton />
            </div>
          </Container>
        </header>
      )}
      {children}
    </div>
  )
}
