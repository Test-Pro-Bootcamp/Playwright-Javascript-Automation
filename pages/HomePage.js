
import BasePage from './BasePage';
import { expect } from '@playwright/test';

export default class HomePage extends BasePage {
  constructor(page) {
    super(page);

    // Playlist creation
    this.createPlaylistBtn = page.getByTestId('sidebar-create-playlist-btn');
    this.createSimplePlaylist = page.getByTestId('playlist-context-menu-create-simple');
    this.playlistNameInput = page.getByPlaceholder('↵ to save');

    // Navigation
    this.allSongsLink = page.getByRole('link', { name: 'All Songs' });

    // Playlists
    this.playlistLocator = '#playlists li.playlist a';
    this.deletePlaylistBtn = page.locator(
      "//li[contains(@data-testid, 'playlist-context-menu-delete')]"
    );
  }

  async createPlaylist(name) {
    await this.createPlaylistBtn.click();
    await this.createSimplePlaylist.click();
    await this.playlistNameInput.fill(name);
    await this.page.keyboard.press('Enter');
  }

  async expectPlaylistExists(name) {
    await expect(
      this.page.locator(this.playlistLocator, { hasText: name })
    ).toBeVisible();
  }

  async clickAllSongs() {
    await this.allSongsLink.click();
  }

  async rightClickPlaylist(name) {
    await this.page
      .locator(this.playlistLocator, { hasText: name })
      .click({ button: 'right' });
  }

  async clickDeletePlaylist() {
    await this.deletePlaylistBtn.click();
  }

  async expectSuccessDelete(message) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
