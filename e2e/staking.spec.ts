import { expect, test } from '@playwright/test'

test('opens delegator account preview', async ({ page }) => {
  await page.goto('/staking')
  await page.getByTestId('staking__showPreview').first().click()
  const publicKey = page.getByTestId('account__publicKey')
  await expect(publicKey).toBeVisible()
})

test('opens delegator in extended view', async ({ page }) => {
  await page.goto('/staking')
  await page.getByTestId('staking__openExtended').first().click()
  const publicKey = page.getByTestId('account__publicKey')
  await expect(publicKey).toBeVisible()
})
