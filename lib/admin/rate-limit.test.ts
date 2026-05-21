import { describe, it, expect, beforeEach, vi } from 'vitest'
import { checkRateLimit, _resetRateLimit } from './rate-limit'

beforeEach(() => {
  _resetRateLimit()
  vi.useRealTimers()
})

describe('rate limiter', () => {
  it('allows up to 3 requests per IP in window', () => {
    expect(checkRateLimit('1.1.1.1')).toBe(true)
    expect(checkRateLimit('1.1.1.1')).toBe(true)
    expect(checkRateLimit('1.1.1.1')).toBe(true)
  })

  it('blocks the 4th request from the same IP', () => {
    checkRateLimit('1.1.1.1')
    checkRateLimit('1.1.1.1')
    checkRateLimit('1.1.1.1')
    expect(checkRateLimit('1.1.1.1')).toBe(false)
  })

  it('tracks IPs separately', () => {
    checkRateLimit('1.1.1.1')
    checkRateLimit('1.1.1.1')
    checkRateLimit('1.1.1.1')
    expect(checkRateLimit('2.2.2.2')).toBe(true)
  })

  it('allows requests again after window expires', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    checkRateLimit('1.1.1.1')
    checkRateLimit('1.1.1.1')
    checkRateLimit('1.1.1.1')
    expect(checkRateLimit('1.1.1.1')).toBe(false)
    vi.setSystemTime(new Date('2026-01-01T00:11:00Z'))
    expect(checkRateLimit('1.1.1.1')).toBe(true)
  })
})
