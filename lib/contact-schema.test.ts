import { describe, expect, it } from 'vitest'

import { ContactSchema } from './contact-schema'

const valid = {
  name: 'Ivan',
  email: 'ivan@example.com',
  message: 'Ovo je test poruka.',
}

describe('ContactSchema', () => {
  describe('name', () => {
    it('odbija prazno ime', () => {
      const r = ContactSchema.safeParse({ ...valid, name: '' })
      expect(r.success).toBe(false)
    })

    it('odbija ime od 1 znaka', () => {
      const r = ContactSchema.safeParse({ ...valid, name: 'A' })
      expect(r.success).toBe(false)
    })

    it('prihvata ime od 2 znaka', () => {
      const r = ContactSchema.safeParse({ ...valid, name: 'Iv' })
      expect(r.success).toBe(true)
    })

    it('prihvata ime od 80 znakova', () => {
      const r = ContactSchema.safeParse({ ...valid, name: 'A'.repeat(80) })
      expect(r.success).toBe(true)
    })

    it('odbija ime od 81 znaka', () => {
      const r = ContactSchema.safeParse({ ...valid, name: 'A'.repeat(81) })
      expect(r.success).toBe(false)
    })

    it('trim-uje belaške pre validacije dužine', () => {
      const r = ContactSchema.safeParse({ ...valid, name: '  A  ' })
      expect(r.success).toBe(false)
    })
  })

  describe('email', () => {
    it('odbija prazan email', () => {
      const r = ContactSchema.safeParse({ ...valid, email: '' })
      expect(r.success).toBe(false)
    })

    it('odbija string bez @', () => {
      const r = ContactSchema.safeParse({ ...valid, email: 'nije-email' })
      expect(r.success).toBe(false)
    })

    it('prihvata standardnu adresu', () => {
      const r = ContactSchema.safeParse({ ...valid, email: 'a@b.co' })
      expect(r.success).toBe(true)
    })

    it('prihvata email od tačno 120 znakova', () => {
      const at120 = `${'a'.repeat(115)}@b.co`
      expect(at120).toHaveLength(120)
      const r = ContactSchema.safeParse({ ...valid, email: at120 })
      expect(r.success).toBe(true)
    })

    it('odbija email duži od 120 znakova', () => {
      const at121 = `${'a'.repeat(116)}@b.co`
      expect(at121).toHaveLength(121)
      const r = ContactSchema.safeParse({ ...valid, email: at121 })
      expect(r.success).toBe(false)
    })
  })

  describe('message', () => {
    it('odbija praznu poruku', () => {
      const r = ContactSchema.safeParse({ ...valid, message: '' })
      expect(r.success).toBe(false)
    })

    it('odbija poruku od 9 znakova', () => {
      const r = ContactSchema.safeParse({ ...valid, message: 'A'.repeat(9) })
      expect(r.success).toBe(false)
    })

    it('prihvata poruku od 10 znakova', () => {
      const r = ContactSchema.safeParse({ ...valid, message: 'A'.repeat(10) })
      expect(r.success).toBe(true)
    })

    it('prihvata poruku od 2000 znakova', () => {
      const r = ContactSchema.safeParse({ ...valid, message: 'A'.repeat(2000) })
      expect(r.success).toBe(true)
    })

    it('odbija poruku od 2001 znaka', () => {
      const r = ContactSchema.safeParse({ ...valid, message: 'A'.repeat(2001) })
      expect(r.success).toBe(false)
    })
  })

  it('vraća sva validna polja kad je input ispravan', () => {
    const r = ContactSchema.safeParse(valid)
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.name).toBe('Ivan')
      expect(r.data.email).toBe('ivan@example.com')
      expect(r.data.message).toBe('Ovo je test poruka.')
    }
  })
})
