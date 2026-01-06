// @ts-check
import { test, expect } from '@playwright/test';
import {LoginPage} from "../pages/LoginPage";

test.describe(`Login tests`, () => {

  test.beforeEach(async ({page}) => {
    await page.goto('https://qa.koel.app/')
  });

  test(`User logs in @smoke`, async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.enterEmail("oleg@testpro.io")
    await loginPage.enterPassword("R4Swbxexv$yqQ9W1")
    await loginPage.clickLogIn()

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Koel/);
  });
});