import { test, expect } from '@playwright/test'

test('has header', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('dashboard__header')).toBeVisible()
})
