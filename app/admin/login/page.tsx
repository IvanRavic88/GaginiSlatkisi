import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Heading, Subheading } from '@/components/ui'
import { SprinkleDot, SprinkleStick, HeartDecor } from '@/components/ui/sprinkle'
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
  const errorMessage = error ? (ERROR_MESSAGES[error] ?? null) : null

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-cream)] px-[1.6rem] py-[4.8rem]">
      {/* Backdrop blooms */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(60rem 40rem at 12% 8%, rgba(246, 80, 160, 0.14), transparent 60%),
            radial-gradient(50rem 38rem at 92% 95%, rgba(255, 211, 75, 0.18), transparent 65%),
            radial-gradient(40rem 30rem at 50% 50%, rgba(184, 105, 58, 0.06), transparent 70%)
          `,
        }}
      />

      {/* Floating sprinkles — top-left */}
      <div aria-hidden="true" className="pointer-events-none absolute top-[6%] left-[8%] hidden sm:block">
        <SprinkleStick
          rotate={-22}
          color="var(--color-accent)"
          className="animate-float-gentle absolute h-[0.7rem] w-[2.4rem]"
        />
        <SprinkleDot
          color="var(--color-caramel)"
          className="animate-float-gentle absolute top-[2.4rem] left-[2.8rem] h-[1rem] w-[1rem]"
        />
        <HeartDecor className="animate-float-gentle absolute top-[5.2rem] left-[-1rem] h-[1.8rem] w-[1.8rem]" />
      </div>

      {/* Floating sprinkles — bottom-right */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[7%] bottom-[8%] hidden sm:block">
        <SprinkleDot
          color="var(--color-accent)"
          className="animate-float-gentle absolute h-[0.9rem] w-[0.9rem]"
        />
        <SprinkleStick
          rotate={35}
          color="var(--color-ribbon-bg)"
          className="animate-float-gentle absolute top-[2rem] right-[2rem] h-[0.7rem] w-[2.2rem]"
        />
        <SprinkleDot
          color="var(--color-caramel-light)"
          className="animate-float-gentle absolute top-[4.6rem] right-[-0.6rem] h-[0.7rem] w-[0.7rem]"
        />
      </div>

      <section className="relative w-full max-w-[44rem]">
        {/* Decorative tag */}
        <span
          aria-hidden="true"
          className="absolute -top-[2.8rem] right-[2rem] z-10 inline-block -rotate-[6deg] rounded-full bg-[var(--color-ribbon-bg)] px-[1.4rem] py-[0.6rem] font-[family-name:var(--font-caveat)] text-[1.6rem] leading-none font-bold text-[var(--color-cta-dark)] shadow-[0_0.4rem_1.2rem_rgba(0,0,0,0.12)]"
        >
          samo za Gagu
        </span>

        <div className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(184,105,58,0.18)] bg-[#fffaf3] px-[2.4rem] pt-[4.8rem] pb-[3.2rem] shadow-[0_2.4rem_4.8rem_rgba(184,105,58,0.12),_0_0.6rem_1.6rem_rgba(0,0,0,0.05)] sm:px-[3.6rem] sm:pt-[5.2rem] sm:pb-[3.6rem]">
          {/* Top ribbon */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[0.6rem]"
            style={{
              background:
                'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary-shade) 45%, var(--color-ribbon-bg) 100%)',
            }}
          />

          {/* Logo */}
          <div className="mb-[2.4rem] flex justify-center">
            <Image
              src="/img/GaginiSlatkiši.webp"
              alt="GaginiSlatkiši"
              width={220}
              height={88}
              priority
              className="h-[5.6rem] w-auto drop-shadow-[0_0.4rem_0.8rem_rgba(184,105,58,0.18)]"
            />
          </div>

          <div className="text-center">
            <Subheading className="-rotate-[3deg]">Pozdrav, šefice!</Subheading>
            <Heading as="h1" variant="tertiary" className="mb-[1.2rem]">
              Privatna kuhinja
            </Heading>
            <p className="mx-auto mb-[2.8rem] max-w-[32rem] text-[1.5rem] leading-[1.55] text-[var(--color-caramel)]/85">
              Unesite vaš email — poslaćemo vam jednokratni link za prijavu na admin panel.
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mb-[2rem] flex items-start gap-[0.8rem] rounded-[1rem] border border-[#e0a4a4] bg-[#fdecec] px-[1.4rem] py-[1.2rem] text-[1.4rem] leading-[1.5] text-[#7a2222]"
            >
              <span
                aria-hidden="true"
                className="mt-[0.3rem] flex h-[1.6rem] w-[1.6rem] flex-shrink-0 items-center justify-center rounded-full bg-[#c44d4d] text-[1rem] font-bold text-white"
              >
                !
              </span>
              <span>{errorMessage}</span>
            </div>
          )}

          <LoginForm />

          <p className="mt-[2.4rem] text-center text-[1.3rem] text-[var(--color-caramel)]/70">
            Niste vlasnica?{' '}
            <Link
              href="/"
              className="font-[family-name:var(--font-caveat)] text-[1.7rem] leading-none text-[var(--color-accent)] underline decoration-[var(--color-accent)]/40 underline-offset-[0.4rem] transition hover:decoration-[var(--color-accent)]"
            >
              vrati se na sajt
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
