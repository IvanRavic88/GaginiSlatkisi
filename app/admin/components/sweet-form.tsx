'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import type { ActionResult } from '@/app/actions/admin-sweet'
import { ImageUploader } from './image-uploader'

interface Category {
  _id: string
  name: string
}

interface InitialValues {
  name?: string
  categoryId?: string
  description?: string
  imageAlt?: string
  imageUrl?: string | null
}

interface Props {
  categories: Category[]
  initial?: InitialValues
  action: (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>
  submitLabel: string
  isEdit?: boolean
}

export function SweetForm({ categories, initial, action, submitLabel, isEdit }: Props) {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(action, null)

  return (
    <form action={formAction} className="flex flex-col gap-[2.4rem]">
      {/* Two-column layout: text fields left, image right on desktop */}
      <div className="grid gap-[2.4rem] lg:grid-cols-[1.2fr_1fr] lg:gap-[3.2rem]">
        {/* LEFT — text fields */}
        <div className="flex flex-col gap-[1.8rem]">
          <Field
            id="name"
            label="Naziv"
            error={state?.fieldErrors?.name}
            defaultValue={initial?.name}
            required
            placeholder="npr. Krempita"
          />

          <div className="flex flex-col gap-[0.6rem]">
            <label
              htmlFor="categoryId"
              className="font-[family-name:var(--font-caveat)] text-[2rem] leading-none text-[var(--color-caramel)]"
            >
              Kategorija <span className="text-[var(--color-accent)]">*</span>
            </label>
            <div className="relative">
              <select
                id="categoryId"
                name="categoryId"
                required
                defaultValue={initial?.categoryId ?? ''}
                className="w-full appearance-none rounded-[1rem] border border-[rgba(184,105,58,0.25)] bg-white px-[1.6rem] py-[1.4rem] pr-[3.6rem] text-[1.5rem] text-[var(--color-text-dark)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_0.4rem_rgba(246,80,160,0.12)]"
              >
                <option value="" disabled>
                  Izaberite kategoriju
                </option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-[1.4rem] -translate-y-1/2 text-[var(--color-caramel)]"
              >
                ▾
              </span>
            </div>
            {state?.fieldErrors?.categoryId && (
              <p className="text-[1.3rem] text-red-700">{state.fieldErrors.categoryId}</p>
            )}
          </div>

          <div className="flex flex-col gap-[0.6rem]">
            <label
              htmlFor="description"
              className="font-[family-name:var(--font-caveat)] text-[2rem] leading-none text-[var(--color-caramel)]"
            >
              Opis <span className="text-[var(--color-accent)]">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              defaultValue={initial?.description}
              minLength={10}
              maxLength={2000}
              rows={6}
              placeholder="Kratak opis slatkiša — sastojci, ukus, kome je namenjen…"
              className="resize-y rounded-[1rem] border border-[rgba(184,105,58,0.25)] bg-white px-[1.6rem] py-[1.4rem] text-[1.5rem] leading-[1.5] text-[var(--color-text-dark)] placeholder:text-[var(--color-caramel)]/40 outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_0.4rem_rgba(246,80,160,0.12)]"
            />
            {state?.fieldErrors?.description && (
              <p className="text-[1.3rem] text-red-700">{state.fieldErrors.description}</p>
            )}
          </div>

          <Field
            id="imageAlt"
            label="Alt tekst za sliku"
            hint="Kratak opis slike za screen reader-e."
            error={state?.fieldErrors?.imageAlt}
            defaultValue={initial?.imageAlt}
            required
            placeholder="npr. Krempita na tanjiru"
          />
        </div>

        {/* RIGHT — image uploader */}
        <div className="flex flex-col gap-[0.6rem]">
          <ImageUploader
            name="image"
            existingUrl={initial?.imageUrl ?? null}
            required={!isEdit}
          />
        </div>
      </div>

      {state?.error && !state.fieldErrors && (
        <p
          role="alert"
          className="rounded-[1rem] border border-[#e0a4a4] bg-[#fdecec] px-[1.4rem] py-[1.2rem] text-[1.4rem] text-[#7a2222]"
        >
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-[1.6rem] border-t border-[rgba(184,105,58,0.15)] pt-[2.4rem]">
        <Link
          href="/admin"
          className="font-[family-name:var(--font-caveat)] text-[1.9rem] leading-none text-[var(--color-caramel)] underline decoration-[var(--color-caramel)]/30 underline-offset-[0.4rem] transition hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
        >
          ← otkaži
        </Link>
        <Button
          type="submit"
          variant="full"
          disabled={isPending}
          className="!py-[1.4rem] !text-[1.5rem]"
        >
          {isPending ? 'Snimam…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  hint,
  defaultValue,
  error,
  required,
  placeholder,
}: {
  id: string
  label: string
  hint?: string
  defaultValue?: string
  error?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-[0.6rem]">
      <label
        htmlFor={id}
        className="font-[family-name:var(--font-caveat)] text-[2rem] leading-none text-[var(--color-caramel)]"
      >
        {label}
        {required && <span className="text-[var(--color-accent)]"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="rounded-[1rem] border border-[rgba(184,105,58,0.25)] bg-white px-[1.6rem] py-[1.4rem] text-[1.5rem] text-[var(--color-text-dark)] placeholder:text-[var(--color-caramel)]/40 outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_0.4rem_rgba(246,80,160,0.12)]"
      />
      {hint && !error && (
        <p className="text-[1.25rem] text-[var(--color-caramel)]/60">{hint}</p>
      )}
      {error && <p className="text-[1.3rem] text-red-700">{error}</p>}
    </div>
  )
}
