import { expect, test } from '@playwright/test'

const LEGACY_TO_NEW = [
  { from: '/section/Torte', to: '/torte' },
  { from: '/section/Mus', to: '/mus-kolaci' },
  { from: '/section/Casice', to: '/cokoladne-casice' },
  { from: '/section/Mini', to: '/mini-cheese' },
  { from: '/login', to: '/' },
]

for (const { from, to } of LEGACY_TO_NEW) {
  test(`${from} → 308 → ${to}`, async ({ page }) => {
    const response = await page.goto(from)
    expect(response?.status()).toBe(200) // posle redirect-a
    await expect(page).toHaveURL(new RegExp(`${to.replace('/', '\\/')}$`))
  })
}
