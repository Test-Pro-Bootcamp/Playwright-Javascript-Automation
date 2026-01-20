import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';

test.describe('User authentication', () => {
  let loginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('login with valid credentials', { tag: '@smoke' },  async ({ page }) => {
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);

    const homePage = new HomePage(page);

    // Validate that home page is opened
    await homePage.expectHomePageIsOpened();
  });

  test('login with invalid password', { tag: '@regression' }, async ({ page }) => {
    await loginPage.login(process.env.EMAIL, 'WRONG_PASSWORD');
    
    // Verify the login for got an error
    await loginPage.expectLoginFormError()
  });
});