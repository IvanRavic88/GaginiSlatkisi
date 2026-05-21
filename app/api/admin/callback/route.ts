import { NextResponse, type NextRequest } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  getAdminEmail,
} from '@/lib/admin/config'
import { signSessionToken } from '@/lib/admin/auth'
import { verifyMagicToken } from '@/lib/admin/magic-link'
import { isTokenUsed, markTokenUsed } from '@/lib/admin/used-tokens'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login?error=missing', req.url))
  }

  if (isTokenUsed(token)) {
    return NextResponse.redirect(new URL('/admin/login?error=used', req.url))
  }

  const payload = await verifyMagicToken(token)
  if (!payload) {
    return NextResponse.redirect(new URL('/admin/login?error=expired', req.url))
  }

  if (payload.email !== getAdminEmail()) {
    return NextResponse.redirect(new URL('/admin/login?error=forbidden', req.url))
  }

  markTokenUsed(token)
  const sessionToken = await signSessionToken(payload.email)

  const response = NextResponse.redirect(new URL('/admin', req.url))
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  })
  return response
}
