import { test, expect } from '@playwright/test';
import { PlaylistManagementAPI } from "../../api/PlaylistManagementAPI";
import { AuthenticationAPI } from "../../api/AuthenticationAPI";

test.describe('Playlist management API @api', () => {

    let playlistManagementAPI;
    let playlistId;

    test.beforeEach(async ({ request }) => {
        playlistManagementAPI = new PlaylistManagementAPI(request);

        const authenticationAPI = new AuthenticationAPI(request);
        const response = await authenticationAPI.login(process.env.EMAIL, process.env.PASSWORD);
        const body = await response.json();
        playlistManagementAPI.token = body.token;
    });

    test('Create a new playlist', async ({ }) => {
        const playlistName = `Playlist ${Date.now()}`;
        const response = await playlistManagementAPI.createPlaylist(playlistName);

        expect(response.status()).toBe(200);
        const body = await response.json();

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
        const response = await playlistManagementAPI.syncPlaylist(playlistId, ['06cd19b77127f1e7f889ecad54376b30']);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toEqual([]);
    });

    test('Delete a playlist', async ({ }) => {
        const response = await playlistManagementAPI.deletePlaylist(playlistId);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toEqual([]);
    });
});