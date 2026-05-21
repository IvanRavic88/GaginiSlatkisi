import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import MagicLinkEmail from '@/emails/magic-link'
import { getAdminEmail, getSiteOrigin } from '@/lib/admin/config'
import { generateMagicToken } from '@/lib/admin/magic-link'
import { checkRateLimit } from '@/lib/admin/rate-limit'

function getIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing env: ${name}`)
  return value
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Previše pokušaja. Pokušajte ponovo za 10 minuta.' },
      { status: 429 },
    )
  }

  let email: string
  try {
    const body = await req.json()
    email = String(body.email ?? '').toLowerCase().trim()
  } catch {
    return NextResponse.json({ ok: false, error: 'Neispravan zahtev.' }, { status: 400 })
  }

  if (!email || !email.includes('@')) {
    return NextResponse.json({ ok: false, error: 'Unesite važeću email adresu.' }, { status: 400 })
  }

  if (email === getAdminEmail()) {
    const token = await generateMagicToken(email)
    const loginUrl = `${getSiteOrigin()}/api/admin/callback?token=${encodeURIComponent(token)}`
    const resend = new Resend(requireEnv('RESEND_API_KEY'))
    await resend.emails.send({
      from: requireEnv('RESEND_FROM_EMAIL'),
      to: email,
      subject: 'Prijava na admin panel — GaginiSlatkiši',
      react: MagicLinkEmail({ loginUrl }),
    })
  }

  return NextResponse.json({ ok: true })
}
