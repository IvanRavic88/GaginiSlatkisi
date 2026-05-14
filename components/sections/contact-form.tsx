'use client'

import Script from 'next/script'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import { Container, Heading, Subheading, useToast } from '@/components/ui'
import { sendContact, type ContactState } from '@/app/actions/contact'

declare global {
  interface Window {
    turnstile?: {
      reset: (widgetId?: string) => void
    }
  }
}

const initialState: ContactState | null = null

export function ContactForm({ phone, email }: { phone?: string | null; email?: string | null }) {
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
    <Container as="section" id="kontakt" className="py-[6.4rem]">
      <div className="text-center">
        <Subheading>Kontakt</Subheading>
        <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
          Spremni za narudžbinu?
        </Heading>
        <p className="mx-auto mt-[1.6rem] max-w-[60rem] text-[1.8rem] text-[var(--color-text-muted)]">
          Pišite nam ili nas pozovite — odgovaramo u toku istog dana.
        </p>
        {(phone || email) && (
          <p className="mx-auto mt-[1.2rem] max-w-[60rem] text-[1.6rem] text-[var(--color-text-muted)]">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="font-medium text-[var(--color-accent-text)] underline-offset-4 hover:underline"
              >
                {phone}
              </a>
            )}
            {phone && email ? ' · ' : ''}
            {email && (
              <a
                href={`mailto:${email}`}
                className="font-medium text-[var(--color-accent-text)] underline-offset-4 hover:underline"
              >
                {email}
              </a>
            )}
          </p>
        )}
      </div>

      <form
        ref={formRef}
        action={formAction}
        noValidate
        className="mx-auto mt-[4.8rem] grid max-w-[64rem] gap-[2rem]"
      >
        <Field label="Ime i prezime" name="name" error={fieldErrors?.name?.[0]}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
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
            maxLength={120}
            className={inputCls(Boolean(fieldErrors?.email?.[0]))}
          />
        </Field>

        <Field label="Poruka" name="message" error={fieldErrors?.message?.[0]}>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={2000}
            className={`${inputCls(Boolean(fieldErrors?.message?.[0]))} resize-y`}
          />
        </Field>

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
          <div className="flex justify-center">
            <div
              className="cf-turnstile"
              data-sitekey={siteKey}
              data-theme="light"
              data-language="sr"
            />
          </div>
        ) : (
          <p className="text-center text-[1.4rem] text-[var(--color-text-muted)]">
            (Bot zaštita nije konfigurisana — Turnstile site key nedostaje.)
          </p>
        )}

        <SubmitButton />
      </form>

      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
          async
          defer
        />
      )}
    </Container>
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
        className="mb-[0.6rem] block text-[1.6rem] font-medium text-[var(--color-text-dark)]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-[0.6rem] text-[1.4rem] text-[#b3261e]" role="alert">
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
      className="mx-auto mt-[1.6rem] inline-flex items-center justify-center gap-[0.8rem] rounded-[var(--radius-default)] bg-[var(--color-primary-shade)] px-[3.2rem] py-[1.6rem] text-[1.6rem] font-semibold text-white transition-all duration-200 hover:bg-[#ec6c8c] focus-visible:ring-2 focus-visible:ring-[var(--color-primary-shade)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Šaljemo…' : 'Pošalji poruku'}
    </button>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full rounded-[var(--radius-default)] border bg-white px-[1.6rem] py-[1.2rem]',
    'text-[1.6rem] text-[var(--color-text-dark)]',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    hasError
      ? 'border-[#b3261e] focus-visible:ring-[#b3261e]'
      : 'border-[var(--color-primary-tint-2)] focus-visible:ring-[var(--color-accent)]',
  ].join(' ')
}
