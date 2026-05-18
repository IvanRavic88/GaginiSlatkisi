import { expect, test } from '@playwright/test'

test('Subheading koristi Caveat font', async ({ page }) => {
  await page.goto('/')
  const subheading = page.getByText('Slatkiši', { exact: true }).first()
  await expect(subheading).toBeVisible()
  const fontFamily = await subheading.evaluate((el) => getComputedStyle(el).fontFamily)
  expect(fontFamily.toLowerCase()).toContain('caveat')
})

test('Hero akcent reč "Sočne" je u Caveat fontu', async ({ page }) => {
  await page.goto('/')
  const accent = page.getByTestId('hero-accent')
  await expect(accent).toHaveText('Sočne')
  const fontFamily = await accent.evaluate((el) => getComputedStyle(el).fontFamily)
  expect(fontFamily.toLowerCase()).toContain('caveat')
})
