
import { test, expect } from '@playwright/test';

test.describe('User authentication', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User logs in', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Email Address' })
      .fill(process.env.EMAIL);

    await page
      .getByRole('textbox', { name: 'Password' })
      .fill(process.env.PASSWORD);

    await page
      .getByRole('button', { name: 'Log In' })
      .click();

    await expect(page.locator('[data-testid="view-profile-link"]')).toBeVisible();
  });

  test('User is trying to log in with invalid credentials', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Email Address' })
      .fill(process.env.EMAIL);

    await page
      .getByRole('textbox', { name: 'Password' })
      .fill('INVALID_PASSWORD');

    await page
      .getByRole('button', { name: 'Log In' })
      .click();

    // Verify the login for got an error
    await expect(page.locator('form[data-testid="login-form"]')).toHaveClass('error');
  });
});