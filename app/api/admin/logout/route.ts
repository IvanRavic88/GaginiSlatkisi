import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE } from '@/lib/admin/config'

export async function POST(req: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', req.url), {
    status: 303,
  })
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
