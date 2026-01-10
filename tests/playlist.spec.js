import { test, expect } from '@playwright/test';

test.describe('Playlist management', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Email Address')
      .fill(process.env.EMAIL);

    await page.getByPlaceholder('Password')
      .fill(process.env.PASSWORD);

    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page).toHaveURL(/#!\/home/);
    await expect(page.getByText('Your Music')).toBeVisible();
  });

  test('drag and drop song into playlist', async ({ page }) => {

    // create playlist
    await page.getByTestId('sidebar-create-playlist-btn').click();
    await page.getByTestId('playlist-context-menu-create-simple').click();

    const playlistName = `My Playlist ${Date.now()}`;
    await page.getByPlaceholder('↵ to save').fill(playlistName);
    await page.keyboard.press('Enter');

    // go to All Songs
    await page.getByRole('link', { name: 'All Songs' }).click();

    const songsWrapper = page.locator('#songsWrapper');
    const song = songsWrapper.locator('.song-item').first();

    const songTitle = await song.locator('.title').innerText();

    const playlistLink = page.locator('#playlists li.playlist a', { hasText: playlistName });

    // drag song into playlist
    await song.dragTo(playlistLink);

    // optional: verify toast message
    await expect(page.getByText(`Added 1 song into "${playlistName}."`)).toBeVisible();

    // open playlist
    await playlistLink.click();

    // verify song is present in playlist
    const playlistWrapper = page.locator('#playlistWrapper');

    await expect(playlistWrapper.locator('.song-item .title', { hasText: songTitle})).toBeVisible();
  });
});
