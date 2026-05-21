import type { Metadata } from 'next'
import { Container, Heading } from '@/components/ui'
import { LoginForm } from '../components/login-form'

export const metadata: Metadata = {
  title: 'Prijava — Admin',
  robots: { index: false, follow: false },
}

const ERROR_MESSAGES: Record<string, string> = {
  missing: 'Link nije validan. Pošaljite novi.',
  expired: 'Link je istekao. Pošaljite novi.',
  used: 'Link je već iskorišćen. Pošaljite novi.',
  forbidden: 'Ova adresa nema pristup.',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const errorMessage = error ? ERROR_MESSAGES[error] ?? null : null

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
      <Container as="section" className="!px-0">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-md sm:p-10">
          <Heading as="h1" variant="tertiary" className="mb-2 text-center">
            Admin prijava
          </Heading>
          <p className="mb-6 text-center text-sm text-caramel/80">
            Unesite email i pošaljemo vam link za prijavu.
          </p>
          {errorMessage && (
            <p
              role="alert"
              className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              {errorMessage}
            </p>
          )}
          <LoginForm />
        </div>
      </Container>
    </main>
  )
}
