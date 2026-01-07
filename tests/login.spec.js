import { test } from '@playwright/test';

test.describe('User authentication', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User logs in', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill('YOUR_EMAIL_HERE');
    await page.getByRole('textbox', { name: 'Password' }).fill('YOUR_PASSWORD_HERE');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForTimeout(5000);
  });

  test('User is trying to log in with invalid credentials ', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill('YOUR_EMAIL_HERE');
    await page.getByRole('textbox', { name: 'Password' }).fill('INVALID_PASSWORD');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForTimeout(5000);
  });
});