import type { Metadata } from 'next'
import Link from 'next/link'
import { Heading, Subheading } from '@/components/ui'
import { SprinkleDot, SprinkleStick, HeartDecor } from '@/components/ui/sprinkle'

export const metadata: Metadata = {
  title: 'Proverite mejl — Admin',
  robots: { index: false, follow: false },
}

export default function VerifyPage() {
  return (
    <main className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--color-cream)] px-[1.6rem] py-[4.8rem]">
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

      <div aria-hidden="true" className="pointer-events-none absolute top-[8%] right-[10%] hidden sm:block">
        <HeartDecor
          color="var(--color-accent)"
          className="animate-float-gentle h-[2rem] w-[2rem]"
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[10%] left-[10%] hidden sm:block">
        <SprinkleStick
          rotate={28}
          color="var(--color-caramel)"
          className="animate-float-gentle absolute h-[0.7rem] w-[2.4rem]"
        />
        <SprinkleDot
          color="var(--color-ribbon-bg)"
          className="animate-float-gentle absolute top-[2.4rem] left-[3rem] h-[1rem] w-[1rem]"
        />
      </div>

      <section className="relative w-full max-w-[44rem]">
        <div className="relative overflow-hidden rounded-[2.4rem] border border-[rgba(184,105,58,0.18)] bg-[#fffaf3] px-[2.4rem] pt-[5.6rem] pb-[3.6rem] text-center shadow-[0_2.4rem_4.8rem_rgba(184,105,58,0.12),_0_0.6rem_1.6rem_rgba(0,0,0,0.05)] sm:px-[3.6rem]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[0.6rem]"
            style={{
              background:
                'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary-shade) 45%, var(--color-ribbon-bg) 100%)',
            }}
          />

          {/* Envelope/heart icon */}
          <div className="mx-auto mb-[2.4rem] flex h-[8rem] w-[8rem] items-center justify-center rounded-full bg-[var(--color-primary)] shadow-[inset_0_0_0_0.4rem_rgba(246,80,160,0.18)]">
            <svg
              viewBox="0 0 64 64"
              aria-hidden="true"
              className="h-[3.6rem] w-[3.6rem] text-[var(--color-accent)]"
            >
              <rect
                x="8"
                y="16"
                width="48"
                height="34"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M10 20 L32 38 L54 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M32 40 c -4 -3 -8 -6 -8 -10 c 0 -3 3 -5 6 -5 c 1 0 2 0.5 2 1.5 c 0 -1 1 -1.5 2 -1.5 c 3 0 6 2 6 5 c 0 4 -4 7 -8 10 z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
          </div>

          <Subheading className="-rotate-[2deg]">Skoro pa gotovo</Subheading>
          <Heading as="h1" variant="tertiary" className="mb-[1.6rem]">
            Proverite mejl
          </Heading>

          <p className="mx-auto mb-[1.2rem] max-w-[34rem] text-[1.5rem] leading-[1.6] text-[var(--color-caramel)]">
            Poslali smo vam link za prijavu. Otvorite ga{' '}
            <span className="font-semibold text-[var(--color-accent-text)]">u istom pretraživaču</span>.
          </p>

          <ul className="mx-auto mb-[2.4rem] max-w-[32rem] space-y-[0.6rem] text-left text-[1.35rem] text-[var(--color-caramel)]/80">
            <li className="flex items-start gap-[0.8rem]">
              <span className="mt-[0.6rem] block h-[0.4rem] w-[0.4rem] flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
              <span>Link važi <strong>15 minuta</strong>.</span>
            </li>
            <li className="flex items-start gap-[0.8rem]">
              <span className="mt-[0.6rem] block h-[0.4rem] w-[0.4rem] flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
              <span>Iskoristi se samo jednom.</span>
            </li>
            <li className="flex items-start gap-[0.8rem]">
              <span className="mt-[0.6rem] block h-[0.4rem] w-[0.4rem] flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
              <span>Ako ne vidite mejl — pogledajte spam folder.</span>
            </li>
          </ul>

          <Link
            href="/admin/login"
            className="inline-flex items-center gap-[0.6rem] font-[family-name:var(--font-caveat)] text-[2rem] leading-none text-[var(--color-accent)] underline decoration-[var(--color-accent)]/40 underline-offset-[0.5rem] transition hover:decoration-[var(--color-accent)]"
          >
            <span aria-hidden="true">←</span> pošalji ponovo
          </Link>
        </div>
      </section>
    </main>
  )
}
