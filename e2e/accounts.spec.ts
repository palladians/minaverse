import { test, expect } from '@playwright/test'

test('opens preview', async ({ page }) => {
  await page.goto('/mainnet/accounts')
  await page.getByTestId('accounts__showPreview').first().click()
  const publicKey = page.getByTestId('account__publicKey')
  await expect(publicKey).toBeVisible()
})

test('opens extended view', async ({ page }) => {
  await page.goto('/mainnet/accounts')
  await page.getByTestId('accounts__openExtended').first().click()
  const publicKey = page.getByTestId('account__publicKey')
  await expect(publicKey).toBeVisible()
})

test.skip('copies account link', async ({ page }) => {
  await page.goto('/mainnet/accounts')
  await page.getByTestId('accounts__copyLink').first().click()
  const toast = page.getByTestId('ui__toast')
  await expect(toast).toBeVisible()
})

test('goes to account transactions', async ({ page }) => {
  await page.goto('/mainnet/accounts')
  await page.getByTestId('accounts__showPreview').first().click()
  await page.getByTestId('accountSheet__seeAllTransactions').first().click()
  const publicKey = page.getByTestId('account__publicKey')
  await expect(publicKey).toBeVisible()
})
