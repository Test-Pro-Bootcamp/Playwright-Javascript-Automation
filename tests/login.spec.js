
import { test, expect } from '@playwright/test';

const loginTestData = [
  {
    title: 'valid credentials',
    email: 'YOUR_EMAIL_HERE',
    password: 'YOUR_PASSWORD_HERE',
    shouldLogin: true,
  },
  {
    title: 'invalid credentials',
    email: 'YOUR_EMAIL_HERE',
    password: 'INVALID_PASSWORD',
    shouldLogin: false,
  },
];  

test.describe('User authentication', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const data of loginTestData) {

    test(`User logs in with ${data.title}`, async ({ page }) => {
      await page
        .getByRole('textbox', { name: 'Email Address' })
        .fill(data.email);

      await page
        .getByRole('textbox', { name: 'Password' })
        .fill(data.password);

      await page
        .getByRole('button', { name: 'Log In' })
        .click();

      if (data.shouldLogin) {
        await expect(page).toHaveURL(/#!\/home/);
        await expect(page.getByText('Your Music')).toBeVisible();
      } else {
        await expect(page.getByText('Your Music')).not.toBeVisible();
      }
    });
  }
});
