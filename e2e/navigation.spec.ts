import { expect, test } from '@playwright/test'

test.describe('using top navigation', () => {
  test('navigates to Accounts', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('navigation__accounts').click()
    await expect(page.getByTestId('accounts__header')).toBeVisible()
  })

  test('navigates to Transactions', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('navigation__transactions').click()
    await expect(page.getByTestId('transactions__header')).toBeVisible()
  })

  test('navigates to Staking', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('navigation__staking').click()
    await expect(page.getByTestId('staking__header')).toBeVisible()
  })

  test('navigates back to dashboard', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('navigation__transactions').click()
    await page.getByTestId('navigation__dashboard').click()
    await expect(page.getByTestId('dashboard__header')).toBeVisible()
  })
})

test.describe('using command palette', () => {
  test('navigates to Accounts', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('navigation__commands').click()
    await page.getByTestId('commands__accounts').click()
    await expect(page.getByTestId('accounts__header')).toBeVisible()
  })

  test('navigates to Transactions', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('navigation__commands').click()
    await page.getByTestId('commands__transactions').click()
    await expect(page.getByTestId('transactions__header')).toBeVisible()
  })

  test('navigates to Staking', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('navigation__commands').click()
    await page.getByTestId('commands__staking').click()
    await expect(page.getByTestId('staking__header')).toBeVisible()
  })

  test('navigates to Settings', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('navigation__commands').click()
    await page.getByTestId('commands__settings').click()
    await expect(page.getByTestId('settings__header')).toBeVisible()
  })
})
