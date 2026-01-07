const { test, expect } = require('@playwright/test');
const { AuthenticationAPI } = require('../../api/AuthenticationAPI');

test('User logs in', async ({ request }) => {
    const authenticationAPI = new AuthenticationAPI(request);

    const response = await authenticationAPI.login('oleg@testpro.io', 'R4Swbxexv$yqQ9W');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(body.token).not.toBeNull();
});