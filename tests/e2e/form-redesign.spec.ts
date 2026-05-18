import { expect, test } from '@playwright/test'

test('Forma ima floating labels koji idu gore na focus', async ({ page }) => {
  await page.goto('/#cta')
  const nameInput = page.locator('input[name="name"]')
  const nameLabel = page.locator('label[for="name"]')
  await expect(nameInput).toBeVisible()
  await expect(nameLabel).toBeVisible()
  const initialTop = await nameLabel.evaluate((el) => el.getBoundingClientRect().top)
  await nameInput.focus()
  await page.waitForTimeout(300)
  const focusedTop = await nameLabel.evaluate((el) => el.getBoundingClientRect().top)
  expect(focusedTop).toBeLessThan(initialTop)
})

test('Forma ima WhatsApp sekundarni link', async ({ page }) => {
  await page.goto('/#cta')
  const waLink = page.locator('#cta').getByRole('link', { name: /WhatsApp/i })
  await expect(waLink).toBeVisible()
  const href = await waLink.getAttribute('href')
  expect(href).toMatch(/^https:\/\/wa\.me\/\d+/)
})
