// PlaylistManagementAPI.js
export class PlaylistManagementAPI {

    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://qa.koel.app/api';
        this.token = null;
    }

    async createPlaylist(name) {
        return await this.request.post(`${this.baseUrl}/playlist`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: { name, rules: [] },
        });
    }

    async syncPlaylist(playlistId, songs = []) {
        return await this.request.put(`${this.baseUrl}/playlist/${playlistId}/sync`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: { songs },
        });
    }

    async deletePlaylist(playlistId) {
        return await this.request.delete(`${this.baseUrl}/playlist/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    }
}
