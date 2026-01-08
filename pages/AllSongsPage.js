import {expect} from "@playwright/test";

export class AllSongsPage {

    constructor(page) {
        this.firstTrack = page.locator("[class='song-item']").first();
        this.playlist = page.locator("[class='playlist playlist']");
        this.successNotification = page.locator('.alertify-logs .success');
    }

    async addFirstSongToPlaylist(){

        await this.firstTrack.dragTo(this.playlist);
    }

    async expectSuccessToast(text) {
        await expect(this.successNotification).toBeVisible();
        await expect(this.successNotification).toHaveText(text);
    }
}