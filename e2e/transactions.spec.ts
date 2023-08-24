import { test, expect } from '@playwright/test'

test.skip('opens preview', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/transactions')
  await page.getByTestId('transactions__showPreview').first().click()
  const hash = page.getByTestId('transaction__hash')
  await expect(hash).toBeVisible()
})

test('opens extended view', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/transactions')
  await page.getByTestId('transactions__openExtended').first().click()
  const hash = page.getByTestId('transaction__hash')
  await expect(hash).toBeVisible()
})

test.skip('copies account link', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/accounts')
  await page.getByTestId('accounts__copyLink').first().click()
  const toast = page.getByTestId('ui__toast')
  await expect(toast).toBeVisible()
})
