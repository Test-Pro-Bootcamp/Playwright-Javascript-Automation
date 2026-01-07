import { test, expect } from '@playwright/test';
import { PlaylistManagementAPI } from "../../api/PlaylistManagementAPI";
import { AuthenticationAPI } from "../../api/AuthenticationAPI";

test.describe('Playlist management API', () => {

    let playlistManagementAPI;
    let playlistId;

    test.beforeEach(async ({ request }) => {
        playlistManagementAPI = new PlaylistManagementAPI(request);

        const authenticationAPI = new AuthenticationAPI(request);
        const response = await authenticationAPI.login('oleg@testpro.io', 'R4Swbxexv$yqQ9W');
        const body = await response.json();
        playlistManagementAPI.token = body.token;
    });

    test('Create a new playlist', async ({ }) => {
        const playlistName = `Playlist ${Date.now()}`;
        const playlist = await playlistManagementAPI.createPlaylist(playlistName);

        expect(playlist.status()).toBe(200);
        const body = await playlist.json();

        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
        expect(body).toMatchObject({
            name: playlistName,
            rules: [],
            is_smart: false,
        });

        playlistId = body.id;
    });

    test('Replace a playlist\'s content', async ({ }) => {
        const result = await playlistManagementAPI.syncPlaylist(playlistId, ['06cd19b77127f1e7f889ecad54376b30']);

        expect(result.status()).toBe(200);
        const body = await result.json();
        expect(body).toEqual([]);
    });

    test('Delete a playlist', async ({ }) => {
        const result = await playlistManagementAPI.deletePlaylist(playlistId);

        expect(result.status()).toBe(200);
        const body = await result.json();
        expect(body).toEqual([]);
    });
});