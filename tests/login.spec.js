  
import { test, expect} from '@playwright/test';

test.describe('User authentication', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login with valid credentials', async ({ page }) => {

    await page.getByPlaceholder('Email Address')
      .fill('YOUR_EMAIL_HERE');

    await page.getByPlaceholder('Password')
      .fill('YOUR_PASSWORD_HERE');

    await page.getByRole('button', { name: 'Log In' }).click();

   // Wait for navigation
    await expect(page).toHaveURL(/#!\/home/);

    // Wait for user-visible confirmation
    await expect(page.getByText("Your Music")).toBeVisible();
  });

  test('login with invalid password', async ({ page }) => {

    await page.locator('input[type="email"]')
      .fill('YOUR_EMAIL_HERE');

    await page.locator('input[type="password"]')
      .fill('WRONG_PASSWORD');

    await page.locator('button[type="submit"]').click();

    // Verify user is NOT logged in
    await expect(page.getByText('Your Music')).not.toBeVisible();
  });
});