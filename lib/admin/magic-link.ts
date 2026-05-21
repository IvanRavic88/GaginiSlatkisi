import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { getAuthSecret, MAGIC_LINK_TTL_SECONDS } from './config'

const PURPOSE = 'magic-link'

export async function generateMagicToken(email: string): Promise<string> {
  return new SignJWT({ email, purpose: PURPOSE })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAGIC_LINK_TTL_SECONDS}s`)
    .sign(getAuthSecret())
}

export async function verifyMagicToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret())
    if (payload.purpose !== PURPOSE) return null
    if (typeof payload.email !== 'string') return null
    return { email: payload.email }
  } catch {
    return null
  }
}
