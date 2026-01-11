import BasePage from './BasePage';
import { expect } from '@playwright/test';

export default class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.createPlaylistBtn = page.getByTestId('sidebar-create-playlist-btn');
    this.createSimplePlaylist = page.getByTestId('playlist-context-menu-create-simple');
    this.playlistNameInput = page.getByPlaceholder('↵ to save');
    this.allSongsLink = page.getByRole('link', { name: 'All Songs' });
    this.playlistLocator = '#playlists li.playlist a';
    this.deletePlaylistBtn = page.locator("//li[contains(@data-testid, 'playlist-context-menu-delete')]")
  }

  async clickCreatePlaylistButton() {
    await this.createPlaylistBtn.click();
  }

  async selectCreateNewPlaylist() {
    await this.createSimplePlaylist.click();
  }

  async enterPlayListName(name) {
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

  async clickDeletePlaylist(name) {
    await this.deletePlaylistBtn.click();
  }

  async expectSuccessDelete(message) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async createPlaylist(name) {
    await this.clickCreatePlaylistButton();
    await this.selectCreateNewPlaylist();
    await this.enterPlayListName(name);
  }
}