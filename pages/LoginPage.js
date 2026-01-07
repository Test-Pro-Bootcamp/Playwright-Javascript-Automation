import {expect} from "@playwright/test";

export class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.locator("[type='email']");
        this.passwordInput = page.locator("[type='password']");
        this.logInButton = page.locator("[type='submit']");
        this.profileButton = this.page.locator('[data-testid="view-profile-link"]');
    }

    async enterEmail(email) {
        await this.emailInput.fill(email)
    }

    async enterPassword(password){
        await this.passwordInput.fill(password);
    }

    async clickLogIn() {
        await this.logInButton.click();
        //await this.page.waitForLoadState('networkidle');
    }

    async logIn(email, password) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password);
        await this.logInButton.click();
    }

    async expectUserRedirectedToHome() {
        await expect(this.page).toHaveURL(
            'https://qa.koel.app/#!/home'
        );
    }

    async expectProfileButtonVisible() {
        await expect(this.profileButton).toBeVisible();
    }

    async expectUserIsLoggedIn() {
        await this.expectUserRedirectedToHome();
        await this.expectProfileButtonVisible();
    }
}