import 'server-only'
import { RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS } from './config'

const buckets = new Map<string, number[]>()

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const timestamps = (buckets.get(ip) ?? []).filter((t) => t > cutoff)
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    buckets.set(ip, timestamps)
    return false
  }
  timestamps.push(now)
  buckets.set(ip, timestamps)
  return true
}

/** Test-only reset hook. Do not use outside tests. */
export function _resetRateLimit(): void {
  buckets.clear()
}
