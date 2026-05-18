import { expect, test } from '@playwright/test'

test('SlatkisiGrid renderuje 9 kategorija iz Sanity-ja', async ({ page }) => {
  await page.goto('/#kolaci')
  const grid = page.locator('#kolaci')
  await expect(grid).toBeVisible()
  const cards = grid.locator('article')
  await expect(cards).toHaveCount(9)
})

test('Prva kartica linka na /torte sa atributima', async ({ page }) => {
  await page.goto('/#kolaci')
  const firstCard = page.locator('#kolaci article').first()
  const link = firstCard.locator('a').first()
  await expect(link).toHaveAttribute('href', '/torte')
  const list = firstCard.locator('ul li')
  await expect(list).toHaveCount(4)
})
