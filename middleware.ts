import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const ADMIN_SESSION_COOKIE = 'gs_admin_session'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/admin/login') ||
    pathname.startsWith('/api/admin/login') ||
    pathname.startsWith('/api/admin/callback') ||
    pathname.startsWith('/api/admin/logout')
  ) {
    return NextResponse.next()
  }

  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }

  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (!token) return NextResponse.redirect(new URL('/admin/login', req.url))

  const secret = process.env.ADMIN_AUTH_SECRET
  if (!secret) return NextResponse.redirect(new URL('/admin/login', req.url))

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    if (payload.purpose !== 'session') {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
