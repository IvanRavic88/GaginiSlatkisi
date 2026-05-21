'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'

import { requireAdmin } from '@/lib/admin/auth'
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  SweetCreateSchema,
  SweetUpdateSchema,
} from '@/lib/admin/sweet-schema'
import { client } from '@/lib/sanity/client'
import { writeClient } from '@/lib/sanity/write-client'

export interface ActionResult {
  ok: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

function buildSlug(name: string): string {
  return slugify(name, { lower: true, strict: true, locale: 'sr' })
}

async function uploadImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    throw new Error('Slika mora biti JPG, PNG ili WebP.')
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('Slika je veća od 5MB.')
  }
  const buffer = Buffer.from(await file.arrayBuffer())
  return writeClient.assets.upload('image', buffer, {
    filename: file.name,
    contentType: file.type,
  })
}

function parseForm(formData: FormData) {
  return {
    name: String(formData.get('name') ?? ''),
    categoryId: String(formData.get('categoryId') ?? ''),
    description: String(formData.get('description') ?? ''),
    imageAlt: String(formData.get('imageAlt') ?? ''),
  }
}

function fieldErrors(error: unknown): Record<string, string> {
  if (!error || typeof error !== 'object' || !('issues' in error)) return {}
  const issues = (error as { issues: Array<{ path: (string | number)[]; message: string }> }).issues
  const out: Record<string, string> = {}
  for (const issue of issues) {
    const key = issue.path.join('.')
    if (!out[key]) out[key] = issue.message
  }
  return out
}

export async function createSweet(
  _: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin()
  const parsed = SweetCreateSchema.safeParse(parseForm(formData))
  if (!parsed.success) {
    return { ok: false, error: 'Proverite polja.', fieldErrors: fieldErrors(parsed.error) }
  }
  const file = formData.get('image')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'Dodajte sliku.' }
  }

  try {
    const asset = await uploadImage(file)
    const slug = buildSlug(parsed.data.name)
    await writeClient.create({
      _type: 'sweet',
      name: parsed.data.name,
      slug: { _type: 'slug', current: slug },
      category: { _type: 'reference', _ref: parsed.data.categoryId },
      description: parsed.data.description,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: parsed.data.imageAlt,
      },
      order: 100,
      featured: false,
    })
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Greška pri snimanju.' }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  redirect('/admin')
}

export async function updateSweet(
  id: string,
  _: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin()
  const parsed = SweetUpdateSchema.safeParse(parseForm(formData))
  if (!parsed.success) {
    return { ok: false, error: 'Proverite polja.', fieldErrors: fieldErrors(parsed.error) }
  }

  try {
    const patch: Record<string, unknown> = {
      name: parsed.data.name,
      slug: { _type: 'slug', current: buildSlug(parsed.data.name) },
      category: { _type: 'reference', _ref: parsed.data.categoryId },
      description: parsed.data.description,
    }

    const file = formData.get('image')
    const altOnlyPatch: Record<string, unknown> = { 'image.alt': parsed.data.imageAlt }

    if (file instanceof File && file.size > 0) {
      const asset = await uploadImage(file)
      patch.image = {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: parsed.data.imageAlt,
      }
      await writeClient.patch(id).set(patch).commit()
    } else {
      await writeClient
        .patch(id)
        .set({ ...patch, ...altOnlyPatch })
        .commit()
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Greška pri izmeni.' }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  redirect('/admin')
}

export async function deleteSweet(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    await writeClient.delete(id)
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Greška pri brisanju.' }
  }
  revalidatePath('/')
  revalidatePath('/admin')
  return { ok: true }
}

export async function fetchAdminCategories() {
  await requireAdmin()
  return client.fetch<Array<{ _id: string; name: string }>>(
    `*[_type == "category"] | order(name asc) { _id, name }`,
  )
}
