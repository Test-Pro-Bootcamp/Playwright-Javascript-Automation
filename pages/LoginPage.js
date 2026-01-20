import BasePage from "./BasePage";
import { expect } from '@playwright/test';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  };

  static get url() {
    return '/';
  };

  async open() {
    await this.page.goto(LoginPage.url);
  };

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  };

  async expectLoginFormError() {
    await expect(this.page.locator(
      'form[data-testid="login-form"]')).toHaveClass('error');
  };    
};