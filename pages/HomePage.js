import {expect} from "@playwright/test";

export class HomePage {

    constructor(page) {
        this.page = page;
        this.createPlaylistDropDown = page.locator("[data-testid='sidebar-create-playlist-btn']");
        this.createNewPlaylist = page.locator("[data-testid='playlist-context-menu-create-simple']");
        this.nameInputPlayList = page.locator("[placeholder='↵ to save']");
        this.allSongs = page.locator("[href='#!/songs']");
        this.playlist = page.locator("[class='playlist playlist']");
        this.deletePlaylistButton = page.getByTestId(/^playlist-context-menu-delete/)
        this.successNotificationDelete = page.locator('.alertify-logs .success');
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

    async clickAllSongs(){
        await this.allSongs.click();
    }

    async clickDeletePlaylist(){
        await this.deletePlaylistButton.click();
    }

    async rightClickPlaylist(){
        await this.playlist.click({button: 'right'});
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

    async expectSuccessDelete(text) {
        await expect(this.successNotificationDelete).toBeVisible();
        await expect(this.successNotificationDelete).toHaveText(text);
    }
}