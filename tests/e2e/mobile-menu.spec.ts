import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 375, height: 800 } })

test('mobile menu otvara i zatvara', async ({ page }) => {
  await page.goto('/')

  const toggle = page.getByRole('button', { name: /Otvori meni/ })
  await expect(toggle).toBeVisible()

  // Dialog je u DOM-u od start-a, ali aria-hidden=true; klikom na toggle se otvara
  await toggle.click()
  const dialog = page.locator('#mobile-menu')
  await expect(dialog).toHaveAttribute('aria-hidden', 'false')

  // Zatvori dugmetom (sad ima "Zatvori meni")
  await page.getByRole('button', { name: /Zatvori meni/ }).click()
  await expect(dialog).toHaveAttribute('aria-hidden', 'true')
})

test('klik na link u mobile menu-u zatvara meni', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Otvori meni/ }).click()
  await page.locator('#mobile-menu').getByRole('link', { name: 'Kontakt' }).click()
  await expect(page).toHaveURL(/#footer$/)
})
