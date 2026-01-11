import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

test.describe('User authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LoginPage.url)
  });

  test('login with valid credentials', { tag: '@smoke' },  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);

    // Validate that home page is opened
    await homePage.expectHomePageIsOpened();
  });

  test('login with invalid password', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.login(process.env.EMAIL, 'WRONG_PASSWORD');

    // Validate that home page is not opened
    await homePage.expectHomePageIsNotOpened();
  });
});