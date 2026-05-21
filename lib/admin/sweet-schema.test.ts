import { describe, it, expect } from 'vitest'
import { SweetCreateSchema, SweetUpdateSchema } from './sweet-schema'

describe('SweetCreateSchema', () => {
  const valid = {
    name: 'Krempita',
    categoryId: 'cat-123',
    description: 'Klasična krempita sa žutim slojem.',
    imageAlt: 'Krempita na tanjiru',
  }

  it('accepts valid input', () => {
    expect(SweetCreateSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects name shorter than 2', () => {
    expect(SweetCreateSchema.safeParse({ ...valid, name: 'A' }).success).toBe(false)
  })

  it('rejects name longer than 150', () => {
    expect(
      SweetCreateSchema.safeParse({ ...valid, name: 'a'.repeat(151) }).success,
    ).toBe(false)
  })

  it('rejects description shorter than 10', () => {
    expect(
      SweetCreateSchema.safeParse({ ...valid, description: 'kratko' }).success,
    ).toBe(false)
  })

  it('rejects missing categoryId', () => {
    expect(
      SweetCreateSchema.safeParse({ ...valid, categoryId: '' }).success,
    ).toBe(false)
  })

  it('rejects empty imageAlt', () => {
    expect(
      SweetCreateSchema.safeParse({ ...valid, imageAlt: '' }).success,
    ).toBe(false)
  })

  it('trims whitespace from name', () => {
    const result = SweetCreateSchema.safeParse({ ...valid, name: '  Krempita  ' })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.name).toBe('Krempita')
  })
})

describe('SweetUpdateSchema', () => {
  it('accepts input without changes to image fields', () => {
    expect(
      SweetUpdateSchema.safeParse({
        name: 'Krempita',
        categoryId: 'cat-123',
        description: 'Klasična krempita sa žutim slojem.',
        imageAlt: 'Krempita na tanjiru',
      }).success,
    ).toBe(true)
  })
})
