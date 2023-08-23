import { test, expect } from '@playwright/test'

test('navigates to Accounts', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000')
  await page.getByTestId('navigation__accounts').click()
  await expect(page.getByTestId('accounts__header')).toBeVisible()
})

test('navigates to Transactions', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000')
  await page.getByTestId('navigation__transactions').click()
  await expect(page.getByTestId('transactions__header')).toBeVisible()
})

test('navigates to Staking', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000')
  await page.getByTestId('navigation__staking').click()
  await expect(page.getByTestId('staking__header')).toBeVisible()
})
