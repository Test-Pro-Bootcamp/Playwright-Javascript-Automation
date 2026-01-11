export class AuthenticationAPI {

    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://qa.koel.app/api';
    }

    async login(email, password) {
        return await this.request.post(`${this.baseUrl}/me`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: {
                email,
                password,
            },
        });
    }
}