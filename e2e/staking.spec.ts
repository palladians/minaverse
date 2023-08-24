import { test, expect } from '@playwright/test'

test('opens delegator in extended view', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/staking')
  await page.getByTestId('staking__openExtended').first().click()
  const publicKey = page.getByTestId('account__publicKey')
  await expect(publicKey).toBeVisible()
})
