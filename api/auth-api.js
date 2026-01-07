export class AuthAPI {
    /**
     * @param {import('@playwright/test').APIRequestContext} request
     */
    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://qa.koel.app/api';
    }

    /**
     * @param {string} email
     * @param {string} password
     * @returns {Promise<{ token: string }>}
     */
    async login(email, password) {
        const response = await this.request.post(`${this.baseUrl}/me`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: {
                email,
                password,
            },
        });

        if (response.status() !== 200) {
            throw new Error(`Login failed with status ${response.status()}`);
        }

        const body = await response.json();

        if (!body || !body.token) {
            throw new Error('Login failed, token not found in response');
        }

        return body;
    }
}