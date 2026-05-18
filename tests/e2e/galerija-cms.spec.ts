import { expect, test } from '@playwright/test'

test('Galerija renderuje 27 stavki', async ({ page }) => {
  await page.goto('/#galerija')
  const gallerySection = page.locator('#galerija')
  await expect(gallerySection).toBeVisible()
  const buttons = gallerySection.locator('button[aria-label^="Otvori sliku"]')
  await expect(buttons).toHaveCount(27)
})

test('Galerija lightbox se otvara na klik', async ({ page }) => {
  await page.goto('/#galerija')
  const firstBtn = page.locator('#galerija button[aria-label^="Otvori sliku"]').first()
  await firstBtn.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
})
