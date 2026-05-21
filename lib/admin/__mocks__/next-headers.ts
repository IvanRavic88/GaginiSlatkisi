// Mock for next/headers in Vitest test environment
export const cookies = async () => ({
  get: (_name: string) => undefined,
  set: (_name: string, _value: string, _opts?: unknown) => {},
  delete: (_name: string) => {},
})
