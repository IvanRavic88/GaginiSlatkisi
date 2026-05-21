// Mock for next/navigation in Vitest test environment
export const redirect = (_url: string): never => {
  throw new Error(`redirect: ${_url}`)
}
