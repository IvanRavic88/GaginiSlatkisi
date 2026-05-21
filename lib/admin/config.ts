import 'server-only'

export const ADMIN_SESSION_COOKIE = 'gs_admin_session'
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24 * 30 // 30 days
export const MAGIC_LINK_TTL_SECONDS = 60 * 15 // 15 minutes
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
export const RATE_LIMIT_MAX_REQUESTS = 3

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.trim() === '') {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

export function getAdminEmail(): string {
  return requireEnv('ADMIN_EMAIL').toLowerCase().trim()
}

export function getAuthSecret(): Uint8Array {
  return new TextEncoder().encode(requireEnv('ADMIN_AUTH_SECRET'))
}

export function getSiteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'http://localhost:3000'
}
