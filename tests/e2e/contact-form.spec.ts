import { expect, test } from '@playwright/test'

test.describe('Contact form', () => {
  test('renderuje sva tri polja + submit dugme', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator('#kontakt').scrollIntoViewIfNeeded()

    await expect(page.getByLabel('Ime i prezime')).toBeVisible()
    await expect(page.getByLabel('Email', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Poruka')).toBeVisible()
    await expect(page.getByRole('button', { name: /Pošalji poruku/ })).toBeVisible()
  })

  test('honeypot polje je sakriveno od korisnika i ne dobija fokus', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    const honeypot = page.locator('input[name="last_name"]')
    await expect(honeypot).toHaveCount(1)
    await expect(honeypot).not.toBeVisible()
    await expect(honeypot).toHaveAttribute('tabindex', '-1')

    const wrapper = honeypot.locator('xpath=ancestor::*[@aria-hidden="true"][1]')
    await expect(wrapper).toHaveCount(1)
  })

  test('prazna submit forma vrati validacijske greške bez network requesta na Resend', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    let resendCalled = false
    await page.route('https://api.resend.com/**', (route) => {
      resendCalled = true
      return route.abort()
    })

    await page.getByLabel('Ime i prezime').fill('A')
    await page.getByLabel('Email', { exact: true }).fill('nije-email')
    await page.getByLabel('Poruka').fill('kratko')

    await page.getByRole('button', { name: /Pošalji poruku/ }).click()

    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 5000 })
    expect(resendCalled).toBe(false)
  })
})
