import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['scripts/**/*.test.ts', 'lib/**/*.test.ts'],
    passWithNoTests: true,
  },
  resolve: {
    alias: { '@': resolve(__dirname, '.') },
  },
})
