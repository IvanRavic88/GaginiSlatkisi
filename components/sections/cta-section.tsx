'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { sendContact, type ContactState } from '@/app/actions/contact'
import { useToast } from '@/components/ui'
import { ViberIcon } from '@/components/ui/icons'

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
      className="px-[1.6rem] py-[4.5rem] sm:px-[2.4rem] md:px-[3.2rem] md:py-[6.4rem]"
    >
      <div className="mx-auto max-w-[120rem]">
        <div className="grid overflow-hidden rounded-[11px] bg-[linear-gradient(to_right_bottom,var(--color-cta-from),var(--color-cta-to))] shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.15)] lg:grid-cols-[1.5fr_1fr]">
          <div className="px-[2rem] py-[3.6rem] text-[var(--color-cta-dark)] sm:px-[3.2rem] sm:py-[4.8rem] md:px-[6.4rem] md:pb-[6.4rem]">
            <h2 className="mb-[2.4rem] font-sans text-[3rem] leading-[1.2] font-bold tracking-[-0.5px] text-[var(--color-cta-heading)] sm:mb-[3.2rem] sm:text-[3.6rem] md:text-[4.4rem]">
              Odgovaramo na sva vaša pitanja!
            </h2>
            <p className="mb-[3.2rem] text-[1.6rem] leading-[1.7] sm:mb-[4.8rem] sm:text-[1.8rem] sm:leading-[1.8]">
              Pošaljite nam pitanje, predlog, želju... Mi ćemo pokušati da Vam odgovorimo u što
              kraćem vremenskom periodu.
            </p>

            <form
              ref={formRef}
              action={formAction}
              noValidate
              className={`grid gap-x-[2rem] gap-y-[2rem] sm:grid-cols-2 sm:gap-x-[3.2rem] sm:gap-y-[3.2rem] ${shake ? 'animate-form-shake' : ''}`}
            >
              <FloatingField
                id="name"
                name="name"
                label="Ime"
                type="text"
                required
                autoComplete="name"
                maxLength={80}
                error={fieldErrors?.name?.[0]}
              />

              <FloatingField
                id="email"
                name="email"
                label="Email"
                type="email"
                required
                autoComplete="email"
                maxLength={120}
                error={fieldErrors?.email?.[0]}
              />

              <div className="sm:col-span-2">
                <FloatingField
                  id="message"
                  name="message"
                  label="Poruka"
                  multiline
                  required
                  rows={3}
                  maxLength={2000}
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
                <div
                  className="cf-turnstile sm:col-span-2"
                  data-sitekey={siteKey}
                  data-language="sr"
                  data-size="flexible"
                />
              ) : null}

              <div className="flex flex-col gap-[1.6rem] sm:col-span-2">
                <SubmitButton />
                <p className="flex flex-wrap items-center justify-center gap-[0.8rem] text-center text-[1.4rem] text-[var(--color-cta-dark)]/80">
                  ili pišite na
                  <Link
                    href={`viber://chat?number=%2B${viberNumber}`}
                    className="group relative inline-flex items-center gap-[0.6rem] overflow-hidden rounded-full bg-white/95 px-[1.4rem] py-[0.6rem] font-semibold text-[var(--color-cta-dark)] shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[0.1rem] hover:shadow-[0_4px_14px_rgba(115,96,242,0.4)]"
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

          <div className="relative hidden h-full min-h-[40rem] w-full overflow-hidden lg:block">
            <Image
              src="/img/GaginiSlatkisi IMG/Gallery-17.webp"
              alt="Aranžman GaginiSlatkiši torti i kolača — porudžbine za sve prilike, Lazarevac"
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover object-top"
            />
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
      </div>
    </section>
  )
}

type FloatingFieldProps = {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  maxLength?: number
  error?: string
  multiline?: boolean
  rows?: number
}

function FloatingField({
  id,
  name,
  label,
  type = 'text',
  required,
  autoComplete,
  maxLength,
  error,
  multiline = false,
  rows = 3,
}: FloatingFieldProps) {
  const [filled, setFilled] = useState(false)
  const baseInput = [
    'peer w-full rounded-[9px] border-2 border-transparent bg-white/95 px-[1.4rem] pt-[2.4rem] pb-[0.8rem]',
    'text-[1.8rem] text-[var(--color-cta-dark)]',
    'shadow-[0_2px_6px_rgba(0,0,0,0.06)]',
    'transition-all duration-200',
    'hover:bg-white focus:bg-white',
    'focus:outline-none focus:border-white focus:shadow-[0_0_0_0.4rem_rgba(255,255,255,0.5)]',
    error ? 'border-[#7a0019] ring-2 ring-[#7a0019]/40' : '',
  ].join(' ')

  const labelCls = [
    'pointer-events-none absolute left-[1.4rem] text-[var(--color-cta-dark)]/85 transition-all duration-200',
    filled ? 'top-[0.8rem] text-[1.2rem] font-medium' : 'top-[1.6rem] text-[1.6rem]',
    'peer-focus:top-[0.8rem] peer-focus:text-[1.2rem] peer-focus:font-medium peer-focus:text-[var(--color-cta-dark)]',
  ].join(' ')

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          maxLength={maxLength}
          placeholder=" "
          onChange={(e) => setFilled(e.target.value.length > 0)}
          className={`${baseInput} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          placeholder=" "
          onChange={(e) => setFilled(e.target.value.length > 0)}
          className={baseInput}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {error && (
        <p
          className="mt-[0.8rem] flex items-start gap-[0.6rem] text-[1.4rem] font-medium text-[#7a0019]"
          role="alert"
        >
          <span aria-hidden="true" className="mt-[0.2rem] flex-none">
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
    <button
      type="submit"
      disabled={pending}
      className="btn-shine w-full cursor-pointer rounded-[9px] bg-[var(--color-cta-dark)] px-[2.4rem] py-[1.4rem] font-[family-name:var(--font-caveat)] text-[2.2rem] font-bold text-[var(--color-primary)] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-200 hover:bg-white hover:text-[var(--color-cta-dark)] focus-visible:ring-2 focus-visible:ring-[var(--color-cta-dark)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:px-[3.2rem] sm:py-[1.6rem] sm:text-[2.6rem]"
    >
      {pending ? 'Šaljemo…' : 'Pošalji nam pitanje'}
    </button>
  )
}
