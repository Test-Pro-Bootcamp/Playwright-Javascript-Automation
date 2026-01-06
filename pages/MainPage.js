export class MainPage {

    constructor(page) {
        this.createPlaylistDropDown = page.locator("[data-testid='sidebar-create-playlist-btn']");
        this.createNewPlaylist = page.locator("[data-testid='playlist-context-menu-create-simple']");
        this.nameInputPlayList = page.locator("[placeholder='↵ to save']");
        this.songs = page.locator("[href='#!/songs']");
        this.firstTrack = page.locator("[class='song-item']").first();
        this.playlist = page.locator("[class='playlist playlist']");
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
}