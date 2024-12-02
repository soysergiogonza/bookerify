import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await page.getByRole('heading', { name: 'Bienvenido/a' }).click();
});
