import {expect} from "@playwright/test";

export class MainPage {

    constructor(page) {
        this.page = page;
        this.createPlaylistDropDown = page.locator("[data-testid='sidebar-create-playlist-btn']");
        this.createNewPlaylist = page.locator("[data-testid='playlist-context-menu-create-simple']");
        this.nameInputPlayList = page.locator("[placeholder='↵ to save']");
        this.songs = page.locator("[href='#!/songs']");
        this.firstTrack = page.locator("[class='song-item']").first();
        this.playlist = page.locator("[class='playlist playlist']");
        this.successNotification = page.locator('.alertify-logs .success');
    }

    async clickCreatePlaylistButton() {
        await this.createPlaylistDropDown.click();
    }

    async selectCreateNewPlaylist() {
        await this.createNewPlaylist.click();
    }

    async enterPlayListName(namePlayList){
        await this.nameInputPlayList.fill(namePlayList);
        await this.pressEnterInputPlayList();
    }

    async pressEnterInputPlayList(){
        await this.nameInputPlayList.press('Enter');
    }

    async clickSongs(){
        await this.songs.click();
    }

    async addSongToPlaylist(){

        await this.firstTrack.dragTo(this.playlist);
    }

    playlistByName(name) {
        return this.page.locator(
            'li.playlist a',
            { hasText: name }
        );
    }

    async expectPlaylistExists(name) {
        const playlist = this.playlistByName(name);
        await expect(playlist).toBeVisible();
    }

    async expectSuccessToast(text) {
        await expect(this.successNotification).toBeVisible();
        await expect(this.successNotification).toHaveText(text);
    }
}