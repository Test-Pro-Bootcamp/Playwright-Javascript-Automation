
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

    await expect(page).toHaveURL(/#!\/home/);
    await expect(page.getByText('Your Music')).toBeVisible();
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

    await expect(page.getByText('Your Music')).not.toBeVisible();
  });
});