'use server'

import { Resend } from 'resend'

import ContactMessageEmail from '@/emails/contact-message'
import { ContactSchema } from '@/lib/contact-schema'

export type ContactState =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

function requireEnv(key: string): string {
  const v = process.env[key]
  if (!v) throw new Error(`Nedostaje env varijabla: ${key}`)
  return v
}

async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    const resp = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: requireEnv('TURNSTILE_SECRET_KEY'),
        response: token,
      }),
    })
    const data = (await resp.json()) as { success: boolean }
    return Boolean(data.success)
  } catch {
    return false
  }
}

export async function sendContact(
  _prev: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  if (formData.get('last_name')) {
    return { ok: true }
  }

  const parsed = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Proverite polja i pokušajte ponovo.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const token = formData.get('cf-turnstile-response')
  if (typeof token !== 'string' || !token) {
    return { ok: false, error: 'Bot provera nije završena. Pokušajte ponovo.' }
  }

  const verified = await verifyTurnstile(token)
  if (!verified) {
    return { ok: false, error: 'Bot provera nije prošla. Osvežite stranicu i pokušajte ponovo.' }
  }

  try {
    const resend = new Resend(requireEnv('RESEND_API_KEY'))
    const { error } = await resend.emails.send({
      from: requireEnv('RESEND_FROM_EMAIL'),
      to: requireEnv('RESEND_TO_EMAIL'),
      replyTo: parsed.data.email,
      subject: `Nova poruka sa sajta — ${parsed.data.name}`,
      react: ContactMessageEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      }),
    })
    if (error) {
      console.error('[contact] Resend error:', error)
      return {
        ok: false,
        error: 'Greška u slanju. Pozovite nas direktno ili pošaljite email.',
      }
    }
    return { ok: true }
  } catch (err) {
    console.error('[contact] send failed:', err)
    return {
      ok: false,
      error: 'Greška u slanju. Pozovite nas direktno ili pošaljite email.',
    }
  }
}
