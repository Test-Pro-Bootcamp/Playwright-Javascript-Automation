
import BasePage from './BasePage';
import { expect } from '@playwright/test';

export default class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.userProfileBtn = page.getByTestId('view-profile-link');
  }

  static get url() {
    return '/#!/home';
  }

  async expectHomePageIsOpened() {
    await expect(this.page).toHaveURL(HomePage.url);
    await expect(this.userProfileBtn).toBeVisible();
  }

  async expectHomePageIsNotOpened() {
    await expect(this.page).not.toHaveURL(HomePage.url);
    await expect(this.userProfileBtn).not.toBeVisible();
  }
}
