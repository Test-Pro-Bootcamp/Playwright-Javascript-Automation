
import BasePage from './BasePage';
import { expect } from '@playwright/test';

export default class AllSongsPage extends BasePage {
  constructor(page) {
    super(page);
    this.songsWrapper = page.locator('#songsWrapper');
    this.toast = page.locator('.toast');
  }

  async getFirstSong() {
    const song = this.songsWrapper.locator('.song-item').first();
    return song;
  }

 async getFirstSongTitle() {
    const song = await this.getFirstSong();
    const songTitle = await song.locator('.title').innerText();
    return songTitle;
  }

  async addFirstSongToPlaylist(playlistName) {
    const song = await this.getFirstSong();
    const playlist = this.page.locator('#playlists li.playlist a', { hasText: playlistName });
    await song.dragTo(playlist);
  }

  async expectSuccessToast(message) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}