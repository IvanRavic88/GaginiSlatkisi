import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Heading } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Proverite mejl — Admin',
  robots: { index: false, follow: false },
}

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
      <Container as="section" className="!px-0">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-md sm:p-10">
          <Heading as="h1" variant="tertiary" className="mb-3">
            Proverite mejl
          </Heading>
          <p className="mb-2 text-caramel">
            Poslali smo vam link za prijavu. Otvorite ga u istom pretraživaču.
          </p>
          <p className="mb-6 text-sm text-caramel/70">
            Link važi 15 minuta. Ako ne vidite mejl, proverite spam folder.
          </p>
          <Link
            href="/admin/login"
            className="text-sm text-accent underline underline-offset-4 hover:text-accent/80"
          >
            Pošalji ponovo
          </Link>
        </div>
      </Container>
    </main>
  )
}
