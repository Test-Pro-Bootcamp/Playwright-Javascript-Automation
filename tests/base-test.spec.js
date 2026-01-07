import { test } from '@playwright/test';

test('open Koel home page', async ({ page }) => {
  await page.goto('/');

  // Pause for 5 seconds to observe the browser
  await page.waitForTimeout(5000);
});
