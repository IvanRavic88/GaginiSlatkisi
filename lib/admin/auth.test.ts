import { describe, it, expect, beforeEach } from 'vitest'
import { signSessionToken, verifySessionToken } from './auth'

beforeEach(() => {
  process.env.ADMIN_AUTH_SECRET = 'test-secret-must-be-long-enough-for-hs256-aaaaaa'
})

describe('session tokens', () => {
  it('roundtrips email', async () => {
    const token = await signSessionToken('user@example.com')
    expect(await verifySessionToken(token)).toEqual({ email: 'user@example.com' })
  })

  it('rejects token whose purpose is magic-link, not session', async () => {
    const { SignJWT } = await import('jose')
    const secret = new TextEncoder().encode(process.env.ADMIN_AUTH_SECRET)
    const wrongPurpose = await new SignJWT({ email: 'x@y.z', purpose: 'magic-link' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret)
    expect(await verifySessionToken(wrongPurpose)).toBeNull()
  })

  it('rejects garbage', async () => {
    expect(await verifySessionToken('not-a-jwt')).toBeNull()
  })
})
