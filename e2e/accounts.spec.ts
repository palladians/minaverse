import { test, expect } from '@playwright/test'

test('opens preview', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/accounts')
  await page.getByTestId('accounts__showPreview').first().click()
  const publicKey = page.getByTestId('account__publicKey')
  await expect(publicKey).toBeVisible()
})
