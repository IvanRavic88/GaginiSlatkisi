'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { sendContact, type ContactState } from '@/app/actions/contact'
import { Button, Heading, Subheading, useToast } from '@/components/ui'
import { ViberIcon } from '@/components/ui/icons'
import { HeartDecor, SprinkleDot, SprinkleStick } from '@/components/ui/sprinkle'

declare global {
  interface Window {
    turnstile?: { reset: (widgetId?: string) => void }
  }
}

const initialState: ContactState | null = null

export function CtaSection({ phone }: { phone: string }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(sendContact, initialState)
  const [shake, setShake] = useState(false)
  const { show } = useToast()
  const viberNumber = phone.replace(/[^0-9]/g, '').replace(/^0/, '381')

  useEffect(() => {
    if (!state) return
    if (state.ok) {
      show('Hvala! Javljamo vam se uskoro 🎂', 'success')
      formRef.current?.reset()
      window.turnstile?.reset()
    } else {
      show(state.error, 'error')
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShake(true)
      const t = setTimeout(() => setShake(false), 400)
      return () => clearTimeout(t)
    }
  }, [state, show])

  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined

  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-[var(--color-cream)] px-[1.6rem] py-[5.6rem] sm:px-[2.4rem] md:px-[3.2rem] md:py-[8rem]"
    >
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[6%] left-[6%] hidden sm:block"
      >
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

      {/* Floating sprinkles — bottom-right (mobile/tablet only — image hugs right on lg+) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] bottom-[8%] hidden sm:block lg:hidden"
      >
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

      {/* Floating sprinkles — bottom-left (lg+ balance, mirrors top-left) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[4%] hidden lg:block"
      >
        <SprinkleDot
          color="var(--color-accent)"
          className="animate-float-gentle absolute h-[0.9rem] w-[0.9rem]"
        />
        <SprinkleStick
          rotate={-35}
          color="var(--color-ribbon-bg)"
          className="animate-float-gentle absolute top-[2rem] left-[2rem] h-[0.7rem] w-[2.2rem]"
        />
        <SprinkleDot
          color="var(--color-caramel-light)"
          className="animate-float-gentle absolute top-[4.6rem] left-[-0.6rem] h-[0.7rem] w-[0.7rem]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[68rem] lg:max-w-[120rem]">
        {/* Decorative tag — top-right of unified container */}
        <span
          aria-hidden="true"
          className="absolute top-[0.8rem] right-[1.2rem] z-30 inline-block -rotate-[6deg] rounded-full bg-[var(--color-ribbon-bg)] px-[1.4rem] py-[0.5rem] font-[family-name:var(--font-caveat)] text-[1.6rem] leading-none font-bold text-[var(--color-cta-dark)] shadow-[0_0.4rem_1.2rem_rgba(0,0,0,0.18)] sm:right-[1.6rem] sm:text-[1.8rem]"
        >
          javite se!
        </span>

        <div className="relative grid overflow-hidden rounded-[2.4rem] border border-[rgba(184,105,58,0.18)] bg-[#fffaf3] shadow-[0_2.4rem_4.8rem_rgba(184,105,58,0.12),_0_0.6rem_1.6rem_rgba(0,0,0,0.05)] lg:grid-cols-[1.5fr_1fr] lg:items-stretch">
          {/* Top ribbon — spans full container width */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 h-[0.6rem]"
            style={{
              background:
                'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary-shade) 45%, var(--color-ribbon-bg) 100%)',
            }}
          />

          {/* Form column */}
          <div className="relative px-[1.6rem] pt-[4.8rem] pb-[3.2rem] sm:px-[4rem] sm:pt-[5.6rem] sm:pb-[4rem] md:px-[5.6rem]">
            <div className="mb-[3.2rem] text-center">
              <Subheading className="-rotate-[3deg]">pišite nam</Subheading>
              <Heading as="h2" variant="secondary" className="mb-[1.6rem]">
                Odgovaramo na sva vaša pitanja!
              </Heading>
              <p className="mx-auto max-w-[44rem] text-[1.5rem] leading-[1.6] text-[var(--color-caramel)]/85 sm:text-[1.6rem]">
                Pošaljite nam pitanje, predlog, želju… Trudimo se da odgovorimo u što kraćem
                vremenskom periodu.
              </p>
            </div>

            <form
              ref={formRef}
              action={formAction}
              noValidate
              className={`grid w-full grid-cols-1 gap-[1.8rem] sm:grid-cols-2 sm:gap-x-[2rem] sm:gap-y-[1.8rem] ${shake ? 'animate-form-shake' : ''}`}
            >
            <CaveatField
              id="name"
              name="name"
              label="Vaše ime"
              type="text"
              required
              autoComplete="name"
              maxLength={80}
              placeholder="npr. Marija"
              error={fieldErrors?.name?.[0]}
            />

            <CaveatField
              id="email"
              name="email"
              label="Email"
              type="email"
              required
              autoComplete="email"
              maxLength={120}
              placeholder="vasa@adresa.com"
              error={fieldErrors?.email?.[0]}
            />

            <div className="sm:col-span-2">
              <CaveatField
                id="message"
                name="message"
                label="Poruka"
                multiline
                required
                rows={4}
                maxLength={2000}
                placeholder="napišite šta vas zanima…"
                error={fieldErrors?.message?.[0]}
              />
            </div>

            <div aria-hidden="true" style={{ display: 'none' }}>
              <label htmlFor="last_name">
                Ostavite ovo polje prazno
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            {siteKey ? (
              <div className="-mx-[1.2rem] flex justify-center overflow-hidden sm:mx-0 sm:col-span-2">
                <div
                  className="cf-turnstile w-full origin-center max-[359px]:scale-[0.85]"
                  data-sitekey={siteKey}
                  data-language="sr"
                  data-size="flexible"
                />
              </div>
            ) : null}

            <div className="flex flex-col gap-[1.6rem] sm:col-span-2">
              <SubmitButton />
              <p className="flex flex-wrap items-center justify-center gap-[0.8rem] text-center text-[1.4rem] text-[var(--color-caramel)]/80">
                ili pišite na
                <Link
                  href={`viber://chat?number=%2B${viberNumber}`}
                  className="group relative inline-flex items-center gap-[0.6rem] overflow-hidden rounded-full bg-white px-[1.4rem] py-[0.6rem] font-bold text-[var(--color-cta-dark)] shadow-[0_2px_6px_rgba(0,0,0,0.08)] ring-1 ring-[rgba(184,105,58,0.15)] transition-all duration-300 hover:-translate-y-[0.1rem] hover:shadow-[0_4px_14px_rgba(115,96,242,0.4)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#7360f2] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <ViberIcon className="relative h-[1.8rem] w-[1.8rem] text-[#7360f2] transition-colors duration-300 group-hover:text-white" />
                  <span className="relative transition-colors duration-300 group-hover:text-white">
                    Viber
                  </span>
                </Link>
              </p>
            </div>
          </form>
          </div>

          {/* Image column — lg+ only; inherits unified container's rounded/border/shadow */}
          <div className="relative hidden min-h-[40rem] border-l border-[rgba(184,105,58,0.12)] lg:block">
            <Image
              src="/img/GaginiSlatkisi IMG/Gallery-17.webp"
              alt="Aranžman GaginiSlatkiši torti i kolača — porudžbine za sve prilike, Lazarevac"
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
          async
          defer
        />
      )}
    </section>
  )
}

type CaveatFieldProps = {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  maxLength?: number
  placeholder?: string
  error?: string
  multiline?: boolean
  rows?: number
}

function CaveatField({
  id,
  name,
  label,
  type = 'text',
  required,
  autoComplete,
  maxLength,
  placeholder,
  error,
  multiline = false,
  rows = 4,
}: CaveatFieldProps) {
  const inputCls = [
    'peer w-full rounded-[1rem] border bg-white px-[1.6rem] py-[1.3rem]',
    'text-[1.5rem] text-[var(--color-text-dark)]',
    'placeholder:text-[var(--color-caramel)]/40',
    'outline-none transition-all duration-200',
    error
      ? 'border-[#c44d4d] focus:border-[#c44d4d] focus:shadow-[0_0_0_0.4rem_rgba(196,77,77,0.15)]'
      : 'border-[rgba(184,105,58,0.25)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_0.4rem_rgba(246,80,160,0.12)]',
  ].join(' ')

  return (
    <div className="flex flex-col gap-[0.6rem]">
      <label
        htmlFor={id}
        className="font-[family-name:var(--font-caveat)] text-[1.9rem] leading-none text-[var(--color-caramel)]"
      >
        {label}
      </label>
      <div className="group relative">
        {multiline ? (
          <textarea
            id={id}
            name={name}
            required={required}
            rows={rows}
            maxLength={maxLength}
            placeholder={placeholder}
            autoComplete="off"
            defaultValue=""
            className={`${inputCls} resize-y`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            autoComplete={autoComplete}
            maxLength={maxLength}
            placeholder={placeholder}
            className={inputCls}
          />
        )}
        {/* Shimmer underline on focus */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[1.2rem] -bottom-[0.2rem] h-[0.2rem] origin-center scale-x-0 rounded-full bg-[var(--color-accent)] transition-transform duration-300 peer-focus:scale-x-100"
        />
      </div>
      {error && (
        <p
          className="mt-[0.2rem] flex items-start gap-[0.6rem] text-[1.35rem] font-medium text-[#7a2222]"
          role="alert"
        >
          <span aria-hidden="true" className="mt-[0.1rem] flex-none">
            ⚠
          </span>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant="full"
      disabled={pending}
      className="!w-full !py-[1.4rem] !text-[1.6rem]"
    >
      {pending ? 'Šaljemo…' : 'Pošalji nam pitanje'}
    </Button>
  )
}
