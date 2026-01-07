// playlist-api.js
export class PlaylistAPI {
    /**
     * @param {import('@playwright/test').APIRequestContext} request
     */
    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://qa.koel.app/api';
        this.token = null;
    }

    async createPlaylist(name) {
        if (!this.token) throw new Error('Token is missing. Call login first.');

        const response = await this.request.post(`${this.baseUrl}/playlist`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: { name, rules: [] },
        });

        if (response.status() !== 200) throw new Error('Failed to create playlist');

        return await response.json();
    }

    async syncPlaylist(playlistId, songs = []) {
        if (!this.token) throw new Error('Token is missing. Call login first.');

        const response = await this.request.put(`${this.baseUrl}/playlist/${playlistId}/sync`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: { songs },
        });

        if (response.status() !== 200) throw new Error('Failed to sync playlist');

        return await response.json();
    }

    async deletePlaylist(playlistId) {
        if (!this.token) throw new Error('Token is missing. Call login first.');

        const response = await this.request.delete(`${this.baseUrl}/playlist/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (response.status() !== 200) throw new Error('Failed to delete playlist');

        return await response.json();
    }
}
