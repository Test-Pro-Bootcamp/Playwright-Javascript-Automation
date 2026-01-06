// @ts-check
import { test } from '@playwright/test';
import {LoginPage} from "../pages/LoginPage";
import {MainPage} from "../pages/MainPage";

test.describe(`Playlist tests`, () => {

    let playlistName = "new playlist " + Date.now();

    test.beforeEach(async ({page}) => {
        await page.goto('https://qa.koel.app/')
    });

    test('Create Playlist @regress', async ({page}) => {
        const loginPage = new LoginPage(page);
        const mainPage = new MainPage(page);

        await loginPage.logIn("oleg@testpro.io", "R4Swbxexv$yqQ9W")

        await page.waitForLoadState('networkidle');
        await mainPage.clickCreatePlaylistButton()

        await mainPage.selectCreateNewPlaylist()

        await mainPage.enterPlayListName(playlistName)
    });

    test('Add song to Playlist @regress', async ({page}) => {
        const loginPage = new LoginPage(page);
        const mainPage = new MainPage(page);

        await loginPage.logIn("oleg@testpro.io", "R4Swbxexv$yqQ9W")

        await mainPage.clickSongs();

        await mainPage.addSongToPlaylist()
        await page.waitForTimeout(5000)
    });
});