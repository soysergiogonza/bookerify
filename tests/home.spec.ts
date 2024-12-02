import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('heading', { name: 'Gestiona tus reservas, simplifica tu negocio.\n' }).click();
});
