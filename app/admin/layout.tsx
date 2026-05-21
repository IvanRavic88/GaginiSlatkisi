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
    <div className="min-h-screen bg-cream">
      {session && (
        <header className="sticky top-0 z-30 border-b border-caramel/15 bg-white/90 backdrop-blur">
          <Container as="nav" className="flex items-center justify-between py-3">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/img/GaginiSlatkiši.webp"
                alt="GaginiSlatkiši"
                width={140}
                height={56}
                priority
                className="h-10 w-auto"
              />
              <span className="font-caveat text-2xl text-accent">Admin</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-caramel/80 sm:inline">
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
