
import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import AllSongsPage from '../../pages/AllSongsPage';

function generatePlaylistName() {
  return 'My Playlist ' + Date.now();
}

test.describe('Playlist management', { tag: '@smoke' }, () => {

  let playlistName;
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    playlistName = generatePlaylistName();
    await loginPage.open();
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
  });

  test('Create Playlist', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.clickCreatePlaylistButton();
    await homePage.selectCreateNewPlaylist();
    await homePage.enterPlayListName(playlistName);
    await homePage.expectPlaylistExists(playlistName);
  });

  test('Add song to Playlist', async ({ page }) => {
    const homePage = new HomePage(page);
    const allSongsPage = new AllSongsPage(page);

    await homePage.createPlaylist(playlistName);
    await homePage.clickAllSongs();
    await allSongsPage.addFirstSongToPlaylist(playlistName);
    await allSongsPage.expectSuccessToast(
      `Added 1 song into "${playlistName}."`
    );
  });

  test('Delete a playlist', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.createPlaylist(playlistName);
    await homePage.rightClickPlaylist(playlistName);
    await homePage.clickDeletePlaylist(playlistName);
    await homePage.expectSuccessDelete(
      `Deleted playlist "${playlistName}."`
    );
  });
});