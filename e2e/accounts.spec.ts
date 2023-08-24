import { test, expect } from '@playwright/test'

test.skip('opens preview', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/accounts')
  await page.getByTestId('accounts__showPreview').first().click()
  const publicKey = page.getByTestId('account__publicKey')
  await expect(publicKey).toBeVisible()
})

test('opens extended view', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/accounts')
  await page.getByTestId('accounts__openExtended').first().click()
  const publicKey = page.getByTestId('account__publicKey')
  await expect(publicKey).toBeVisible()
})

test.skip('copies account link', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/accounts')
  await page.getByTestId('accounts__copyLink').first().click()
  const toast = page.getByTestId('ui__toast')
  await expect(toast).toBeVisible()
})
