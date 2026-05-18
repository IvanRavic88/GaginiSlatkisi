import { expect, test } from '@playwright/test'

test('sitemap.xml ima home + sve kategorije', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)
  const xml = await res.text()
  expect(xml).toContain('<loc>https://www.gaginislatkisi.com/</loc>')
  const locCount = xml.match(/<loc>/g)?.length ?? 0
  expect(locCount).toBeGreaterThanOrEqual(10)
})

test('robots.txt referencira sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.status()).toBe(200)
  const txt = await res.text()
  expect(txt).toContain('Sitemap: https://www.gaginislatkisi.com/sitemap.xml')
  expect(txt).toContain('Disallow: /studio/')
})

test('home page ima LocalBusiness JSON-LD', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const jsonLd = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    return Array.from(scripts).map((s) => s.textContent || '')
  })
  const bakery = jsonLd.find((s) => s.includes('"@type":"Bakery"'))
  expect(bakery).toBeTruthy()
  expect(bakery).toContain('GaginiSlatkiši')
})

test('kategorija ima BreadcrumbList JSON-LD', async ({ page }) => {
  await page.goto('/torte', { waitUntil: 'domcontentloaded' })
  const jsonLd = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    return Array.from(scripts).map((s) => s.textContent || '')
  })
  const breadcrumb = jsonLd.find((s) => s.includes('"BreadcrumbList"'))
  expect(breadcrumb).toBeTruthy()
})

test('html lang="sr"', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('html')).toHaveAttribute('lang', 'sr')
})
