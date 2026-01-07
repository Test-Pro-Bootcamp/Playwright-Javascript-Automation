// PlaylistManagementAPI.js
export class PlaylistManagementAPI {
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

        return response;
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

        return response;
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

        return response;
    }
}
