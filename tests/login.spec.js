import { test, expect } from '@playwright/test';

test.describe('User authentication', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User logs in', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill('YOUR_EMAIL_HERE');
    await page.getByRole('textbox', { name: 'Password' }).fill('YOUR_PASSWORD_HERE');
    await page.getByRole('button', { name: 'Log In' }).click();

    // Wait for user-visible confirmation
    await expect(page.locator('[data-testid="view-profile-link"]')).toBeVisible();
  });

  test('User is trying to log in with invalid credentials ', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill('YOUR_EMAIL_HERE');
    await page.getByRole('textbox', { name: 'Password' }).fill('INVALID_PASSWORD');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.locator('button[type="submit"]').click();
    
    // Verify the login for got an error
    await expect(page.locator('form[data-testid="login-form"]')).toHaveClass('error');
  });
});