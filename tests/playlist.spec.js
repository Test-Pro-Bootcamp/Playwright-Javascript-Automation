
import { test, expect } from '@playwright/test';
import { randomInt } from 'node:crypto';

test.describe('Playlist management', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByPlaceholder('Email Address').fill('andranik@testpro.io');
        await page.getByPlaceholder('Password').fill('Surenchik228.');
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page).toHaveURL(/#!\/home/);
        await expect(page.getByText("Your Music")).toBeVisible();
    });

    test('create a new playlist', async ({ page }) => {
        await page.getByTestId('sidebar-create-playlist-btn').click();
        await page.getByTestId('playlist-context-menu-create-simple').click();
    
        const playlistName = 'My Favorite Songs' + randomInt(100000);
        await page.getByPlaceholder('↵ to save').fill(playlistName);
        await page.keyboard.press('Enter');

        await expect(page.locator(`//section[@id="playlists"]//a[.='${playlistName}']`)).toBeVisible();
    });
});