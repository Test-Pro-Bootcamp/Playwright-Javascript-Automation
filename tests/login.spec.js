  
import { test, expect} from '@playwright/test';

test.describe('User authentication', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login with valid credentials', async ({ page }) => {

    await page.getByPlaceholder('Email Address')
      .fill(process.env.EMAIL);

    await page.getByPlaceholder('Password')
      .fill(process.env.PASSWORD);

    await page.getByRole('button', { name: 'Log In' }).click();

    // Wait for user-visible confirmation
    await expect(page.locator('[data-testid="view-profile-link"]')).toBeVisible();
  });

  test('login with invalid password', async ({ page }) => {

    await page.locator('input[type="email"]')
      .fill(process.env.EMAIL);

    await page.locator('input[type="password"]')
      .fill('WRONG_PASSWORD');

    await page.locator('button[type="submit"]').click();

    // Verify user is NOT logged in
    await expect(page.locator('[data-testid="view-profile-link"]')).not.toBeVisible();
  });
});