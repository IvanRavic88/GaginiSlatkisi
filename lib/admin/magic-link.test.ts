import { describe, it, expect, beforeEach } from 'vitest'
import { generateMagicToken, verifyMagicToken } from './magic-link'

beforeEach(() => {
  process.env.ADMIN_AUTH_SECRET = 'test-secret-must-be-long-enough-for-hs256-aaaaaa'
})

describe('magic link tokens', () => {
  it('roundtrips email', async () => {
    const token = await generateMagicToken('user@example.com')
    const result = await verifyMagicToken(token)
    expect(result).toEqual({ email: 'user@example.com' })
  })

  it('rejects tampered token', async () => {
    const token = await generateMagicToken('user@example.com')
    const tampered = token.slice(0, -4) + 'XXXX'
    expect(await verifyMagicToken(tampered)).toBeNull()
  })

  it('rejects token signed with different secret', async () => {
    const token = await generateMagicToken('user@example.com')
    process.env.ADMIN_AUTH_SECRET = 'a-different-secret-still-long-enough-aaaaaaaa'
    expect(await verifyMagicToken(token)).toBeNull()
  })

  it('rejects token with wrong purpose claim', async () => {
    const { SignJWT } = await import('jose')
    const secret = new TextEncoder().encode(process.env.ADMIN_AUTH_SECRET)
    const wrongPurpose = await new SignJWT({ email: 'x@y.z', purpose: 'session' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(secret)
    expect(await verifyMagicToken(wrongPurpose)).toBeNull()
  })
})
