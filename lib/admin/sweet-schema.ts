import { z } from 'zod'

export const SweetCreateSchema = z.object({
  name: z.string().trim().min(2).max(150),
  categoryId: z.string().trim().min(1),
  description: z.string().trim().min(10).max(2000),
  imageAlt: z.string().trim().min(1).max(200),
})

export type SweetCreateInput = z.infer<typeof SweetCreateSchema>

export const SweetUpdateSchema = SweetCreateSchema

export type SweetUpdateInput = z.infer<typeof SweetUpdateSchema>

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
