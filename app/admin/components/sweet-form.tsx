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
    <form action={formAction} className="flex flex-col gap-6">
      <Field
        id="name"
        label="Naziv"
        error={state?.fieldErrors?.name}
        defaultValue={initial?.name}
        required
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="categoryId" className="text-sm font-medium text-caramel">
          Kategorija *
        </label>
        <select
          id="categoryId"
          name="categoryId"
          required
          defaultValue={initial?.categoryId ?? ''}
          className="rounded-lg border border-caramel/30 bg-white px-4 py-3 text-base text-caramel outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
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
        {state?.fieldErrors?.categoryId && (
          <p className="text-sm text-red-700">{state.fieldErrors.categoryId}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium text-caramel">
          Opis *
        </label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={initial?.description}
          minLength={10}
          maxLength={2000}
          rows={5}
          className="rounded-lg border border-caramel/30 bg-white px-4 py-3 text-base text-caramel outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        {state?.fieldErrors?.description && (
          <p className="text-sm text-red-700">{state.fieldErrors.description}</p>
        )}
      </div>

      <ImageUploader
        name="image"
        existingUrl={initial?.imageUrl ?? null}
        required={!isEdit}
      />

      <Field
        id="imageAlt"
        label="Opis slike (alt tekst za pristupačnost)"
        error={state?.fieldErrors?.imageAlt}
        defaultValue={initial?.imageAlt}
        required
      />

      {state?.error && !state.fieldErrors && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="full" disabled={isPending}>
          {isPending ? 'Snimam…' : submitLabel}
        </Button>
        <Link
          href="/admin"
          className="text-sm text-caramel underline underline-offset-4 hover:text-accent"
        >
          Otkaži
        </Link>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  defaultValue,
  error,
  required,
}: {
  id: string
  label: string
  defaultValue?: string
  error?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-caramel">
        {label}{required ? ' *' : ''}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        required={required}
        defaultValue={defaultValue}
        className="rounded-lg border border-caramel/30 bg-white px-4 py-3 text-base text-caramel outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  )
}
