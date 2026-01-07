import { test, expect } from '@playwright/test';
import {PlaylistAPI} from "../../api/playlist-api";
import {AuthAPI} from "../../api/auth-api";

test.describe('Playlist API', () => {

    let playlistApi;
    let playlistId;

    test.beforeEach(async ({ request }) => {
        playlistApi = new PlaylistAPI(request);

        const authAPI = new AuthAPI(request);
        const body = await authAPI.login('oleg@testpro.io', 'R4Swbxexv$yqQ9W');
        playlistApi.token = body.token;
    });

    test('POST /api/playlist — create playlist successfully', async ({ }) => {
        const playlistName = `Sleepy Songs ${Date.now()}`;
        const playlist = await playlistApi.createPlaylist(playlistName);

        expect(playlist).toHaveProperty('id');
        expect(typeof playlist.id).toBe('number');
        expect(playlist).toMatchObject({
            name: playlistName,
            rules: [],
            is_smart: false,
        });

        playlistId = playlist.id;
    });

    test('PUT /api/playlist/{id}/sync - add a song to a playlist', async ({ }) => {
        const playlist = await playlistApi.createPlaylist(`Temp Playlist ${Date.now()}`);
        playlistId = playlist.id;

        const result = await playlistApi.syncPlaylist(playlistId, ['06cd19b77127f1e7f889ecad54376b30']);
        expect(result).toEqual([]);
    });

    test('DELETE /api/playlist/{id} - delete playlist', async ({ }) => {
        const playlist = await playlistApi.createPlaylist(`Temp Playlist ${Date.now()}`);
        playlistId = playlist.id;

        const result = await playlistApi.deletePlaylist(playlistId);
        expect(result).toEqual([]);
    });
});