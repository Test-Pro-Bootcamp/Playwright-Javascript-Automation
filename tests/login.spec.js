import { test } from '@playwright/test';

test.describe('User authentication', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User logs in', async ({ page }) => {
    // test steps...
  });
});