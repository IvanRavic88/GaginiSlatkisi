import 'server-only'
import { MAGIC_LINK_TTL_SECONDS } from './config'

const used = new Map<string, number>()

function cleanup(now: number): void {
  const cutoff = now - MAGIC_LINK_TTL_SECONDS * 1000
  for (const [token, ts] of used) {
    if (ts < cutoff) used.delete(token)
  }
}

export function markTokenUsed(token: string): void {
  const now = Date.now()
  cleanup(now)
  used.set(token, now)
}

export function isTokenUsed(token: string): boolean {
  cleanup(Date.now())
  return used.has(token)
}

/** Test-only. */
export function _resetUsedTokens(): void {
  used.clear()
}
