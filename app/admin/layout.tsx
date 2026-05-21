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

            <div className="flex items-center gap-[1rem] sm:gap-[1.4rem]">
              <span
                className="hidden truncate max-w-[20rem] text-[1.35rem] text-[var(--color-caramel)]/80 md:inline"
                title={session.email}
              >
                {session.email}
              </span>
              <LogoutButton />
            </div>
          </Container>
        </header>
      )}
      {children}
    </div>
  )
}
