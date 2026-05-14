'use client'

import Image from 'next/image'
import Script from 'next/script'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import { sendContact, type ContactState } from '@/app/actions/contact'
import { useToast } from '@/components/ui'

declare global {
  interface Window {
    turnstile?: {
      reset: (widgetId?: string) => void
    }
  }
}

const initialState: ContactState | null = null

export function CtaSection() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(sendContact, initialState)
  const { show } = useToast()

  useEffect(() => {
    if (!state) return
    if (state.ok) {
      show('Hvala! Javljamo vam se uskoro.', 'success')
      formRef.current?.reset()
      window.turnstile?.reset()
    } else {
      show(state.error, 'error')
    }
  }, [state, show])

  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined

  return (
    <section id="cta" className="px-[3.2rem] py-[4.5rem] md:py-[6.4rem] lg:pb-[12.8rem]">
      <div className="mx-auto max-w-[120rem]">
        <div className="grid overflow-hidden rounded-[11px] bg-[linear-gradient(to_right_bottom,var(--color-cta-from),var(--color-cta-to))] shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.15)] lg:grid-cols-[1.5fr_1fr]">
          <div className="px-[3.2rem] py-[4.8rem] text-[var(--color-cta-dark)] md:px-[6.4rem] md:pb-[6.4rem]">
            <h2 className="mb-[3.2rem] font-display text-[4.4rem] font-bold leading-[1.2] tracking-[-0.5px] text-[var(--color-cta-heading)]">
              Odgovaramo na sva vaša pitanja!
            </h2>
            <p className="mb-[4.8rem] text-[1.8rem] leading-[1.8]">
              Pošaljite nam pitanje, predlog, želju... Mi ćemo pokušati da Vam odgovorimo u što
              kraćem vremenskom periodu.
            </p>

            <form
              ref={formRef}
              action={formAction}
              noValidate
              className="grid gap-x-[3.2rem] gap-y-[2.4rem] sm:grid-cols-2"
            >
              <Field label="Ime" name="name" error={fieldErrors?.name?.[0]}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ime"
                  maxLength={80}
                  className={inputCls(Boolean(fieldErrors?.name?.[0]))}
                />
              </Field>

              <Field label="Email" name="email" error={fieldErrors?.email?.[0]}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="ime@primer.com"
                  maxLength={120}
                  className={inputCls(Boolean(fieldErrors?.email?.[0]))}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Poruka" name="message" error={fieldErrors?.message?.[0]}>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Vaša poruka"
                    maxLength={2000}
                    className={`${inputCls(Boolean(fieldErrors?.message?.[0]))} resize-y`}
                  />
                </Field>
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
                <div className="flex justify-center sm:col-span-2">
                  <div
                    className="cf-turnstile"
                    data-sitekey={siteKey}
                    data-theme="light"
                    data-language="sr"
                  />
                </div>
              ) : (
                <p className="text-center text-[1.4rem] italic text-[var(--color-cta-dark)] sm:col-span-2">
                  (Bot zaštita nije konfigurisana — Turnstile site key nedostaje.)
                </p>
              )}

              <div className="sm:col-span-2">
                <SubmitButton />
              </div>
            </form>
          </div>

          <div className="relative hidden h-full min-h-[40rem] w-full overflow-hidden lg:block">
            <Image
              src="/img/GaginiSlatkisi IMG/Gallery-17.webp"
              alt="Lepo aranžirani GaginiSlatkiši na poslužavniku."
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover object-center"
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

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string
  name: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-[1.2rem] block text-[1.6rem] font-medium text-[var(--color-cta-dark)]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-[0.8rem] text-[1.4rem] font-medium text-[#7a0019]" role="alert">
          {error}
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
      className="w-full rounded-[9px] bg-[var(--color-cta-dark)] px-[3.2rem] py-[1.2rem] text-[1.8rem] font-medium text-[var(--color-primary)] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-200 hover:bg-white hover:text-[var(--color-text-default)] focus-visible:ring-2 focus-visible:ring-[var(--color-cta-dark)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Šaljemo…' : 'Pošalji poruku'}
    </button>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full rounded-[9px] border-0 bg-[var(--color-primary)] px-[1.2rem] py-[1.2rem]',
    'text-[1.8rem] text-[var(--color-cta-dark)]',
    'placeholder:text-[#aaa]',
    'shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
    'focus:outline-none focus-visible:ring-[0.4rem] focus-visible:ring-[rgba(252,241,232,0.7)]',
    hasError ? 'ring-2 ring-[#7a0019]' : '',
  ].join(' ')
}
