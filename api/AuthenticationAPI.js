export class AuthenticationAPI {//переименовать в автаризационное апи

    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://qa.koel.app/api';
    }

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

        return response;
    }
}