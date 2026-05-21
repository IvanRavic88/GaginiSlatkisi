import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  getAuthSecret,
} from './config'

const PURPOSE = 'session'

export async function signSessionToken(email: string): Promise<string> {
  return new SignJWT({ email, purpose: PURPOSE })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_TTL_SECONDS}s`)
    .sign(getAuthSecret())
}

export async function verifySessionToken(
  token: string,
): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret())
    if (payload.purpose !== PURPOSE) return null
    if (typeof payload.email !== 'string') return null
    return { email: payload.email }
  } catch {
    return null
  }
}

export async function getSession(): Promise<{ email: string } | null> {
  const store = await cookies()
  const token = store.get(ADMIN_SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export async function requireAdmin(): Promise<{ email: string }> {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  return session
}
