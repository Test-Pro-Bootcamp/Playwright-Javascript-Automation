// @ts-check
import { test } from '@playwright/test';
import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";
import { AllSongsPage } from "../../pages/AllSongsPage";

test.describe(`Playlist tests`, () => {

    let playlistName = "new playlist " + Date.now();

    test.beforeEach(async ({page}) => {
        await page.goto('https://qa.koel.app/')

        const loginPage = new LoginPage(page);
        await loginPage.logIn("oleg@testpro.io", "R4Swbxexv$yqQ9W")
    });

    test('Create Playlist', async ({page}) => {
        const homePage = new HomePage(page);

        await homePage.clickCreatePlaylistButton()

        await homePage.selectCreateNewPlaylist()

        await homePage.enterPlayListName(playlistName)

        await homePage.expectPlaylistExists(playlistName)
    });

    test('Add song to Playlist', async ({page}) => {
        const homePage = new HomePage(page);
        const allSongsPage = new AllSongsPage(page);

        await homePage.clickAllSongs();

        await allSongsPage.addFirstSongToPlaylist()

        await allSongsPage.expectSuccessToast(
            `Added 1 song into "${playlistName}."`
        );
    });

    test('Delete a playlist', async ({page}) => {
        const homePage = new HomePage(page);

        await homePage.rightClickPlaylist(playlistName);
        await homePage.clickDeletePlaylist(playlistName);
        await homePage.expectSuccessDelete(
            `Deleted playlist "${playlistName}."`
        )
    });
});