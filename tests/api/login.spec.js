const { test, expect } = require('@playwright/test');
const { AuthAPI } = require('./../../api/auth-api');

test('POST /api/me — successful login', async ({ request }) => {
    const authAPI = new AuthAPI(request);

    const body = await authAPI.login('oleg@testpro.io', 'R4Swbxexv$yqQ9W');

    expect(body).toBeDefined();
    expect(body).toHaveProperty('token');
    expect(body.token).not.toBeNull();
});