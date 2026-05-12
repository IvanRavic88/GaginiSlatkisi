import { expect, test } from '@playwright/test'

test('home → klik na CategoryGrid karticu vodi na njenu stranicu', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: /Sočne poslastice/ })).toBeVisible()

  // CategoryGrid je u sekciji #kolaci — uzimam prvu karticu (Torte je prva po order asc)
  const firstCard = page.locator('#kolaci a').first()
  await firstCard.click()

  await expect(page).toHaveURL(/\/torte$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('footer kategorija link radi', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const footerLink = page.locator('footer').getByRole('link', { name: 'Medenjaci' })
  await footerLink.click()
  await expect(page).toHaveURL(/\/medenjaci$/)
})
