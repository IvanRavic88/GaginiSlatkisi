import { describe, it, expect, beforeEach, vi } from 'vitest'
import { markTokenUsed, isTokenUsed, _resetUsedTokens } from './used-tokens'

beforeEach(() => {
  _resetUsedTokens()
  vi.useRealTimers()
})

describe('used token store', () => {
  it('reports unseen token as not used', () => {
    expect(isTokenUsed('tok-1')).toBe(false)
  })

  it('reports marked token as used', () => {
    markTokenUsed('tok-1')
    expect(isTokenUsed('tok-1')).toBe(true)
  })

  it('forgets tokens after TTL', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    markTokenUsed('tok-1')
    vi.setSystemTime(new Date('2026-01-01T00:16:00Z'))
    expect(isTokenUsed('tok-1')).toBe(false)
  })
})
